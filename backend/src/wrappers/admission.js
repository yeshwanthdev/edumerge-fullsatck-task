const rm = require('@root/rm');
const mongoose = require('mongoose');
const admissionModel = require('@model/admission');
const seatMatrixModel = require('@model/seatMatrix');
const paymentModel = require('@model/payment');

const createAdmission = async (data) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { firstName, lastName, email, phone, seatMatrix, quota, academicYear, institution, campus, courseType } = data;
		const seatMatrixId = seatMatrix._id;
		const quotaId = quota._id.toString();

		const seatDoc = await seatMatrixModel.findById(seatMatrixId).session(session).lean();
		if (rm._.isEmpty(seatDoc)) throw new Error('SeatMatrix not found');
		const quotaData = seatDoc.quotaStatus?.[quotaId];
		if (rm._.isEmpty(quotaData)) throw new Error('Quota not found');

		//atomic increment
		const seatUpdate = await seatMatrixModel.updateOne(
			{ _id: seatMatrixId, [`quotaStatus.${quotaId}.filled`]: { $lt: quotaData.total } },
			{ $inc: { [`quotaStatus.${quotaId}.filled`]: 1 } },
			{ session }
		);

		if (seatUpdate.modifiedCount === 0) throw new Error('Quota Full');

		//create admission and set seat locked
		const admission = await admissionModel.create(
			[
				{
					...data,
					isFeePaid: false,
					seatLockedAt: new Date(),
					lockExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
					recordStatus: 'PENDING',
				},
			],
			{ session }
		);

		//create payment
		await paymentModel.create([{ code: rm.utils.guid(), admissionId: admission[0]._id }], { session });
		await session.commitTransaction();
		session.endSession();

		return admission[0];
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const deleteAdmission = async (code) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const admission = await admissionModel
			.findOne({ code: code, recordStatus: rm.enums.admissionStatus.pending, isFeePaid: false, status: true })
			.session(session);

		if (rm._.isEmpty(admission)) throw new Error('Only pending admissions can be deleted');

		const seatMatrixId = admission.seatMatrix;
		const quotaId = admission.quota.toString();

		// dec seat
		await seatMatrixModel.updateOne(
			{ _id: seatMatrixId, [`quotaStatus.${quotaId}.filled`]: { $gt: 0 }, status: true },
			{ $inc: { [`quotaStatus.${quotaId}.filled`]: -1 } },
			{ session }
		);

		//cancel payments
		await paymentModel.updateMany(
			{ admissionId: admission._id, recordStatus: rm.enums.paymentStatus.pending, status: true },
			{ $set: { status: false } },
			{ session }
		);

		//delete admission
		await admissionModel.updateOne({ _id: admission._id }, { $set: { status: false } }, { session });

		await session.commitTransaction();
		session.endSession();

		return admission;
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

//handle min 4 letter later
const generateAdmissionNumber = async (id) => {
	const admission = await admissionModel
		.findOne({ _id: id, status: true })
		.populate('institution', 'name code')
		.populate({
			path: 'seatMatrix',
			populate: {
				path: 'program',
				select: 'name code courseType',
			},
		})
		.populate('quota', 'name code')
		.lean();

	const institution = admission.institution._id;
	const seatMatrix = admission.seatMatrix._id;
	const academicYear = admission.academicYear;
	const courseType = admission.courseType;
	const quota = admission.quota._id;
	//INST/2026/UG/CSE/KCET/0001

	const count = await admissionModel.countDocuments({
		institution,
		academicYear,
		courseType,
		seatMatrix,
		quota,
		recordStatus: rm.enums.admissionStatus.completed,
		status: true,
	});

	const sequence = (count + 1).toString().padStart(4, '0');
	const institutionCode = admission.institution.name.substring(0, 4).toUpperCase();
	const programCode = admission.seatMatrix.program.name.substring(0, 3).toUpperCase();
	const quotaCode = admission.quota.name.substring(0, 4).toUpperCase();

	return `${institutionCode}/${academicYear}/${courseType}/${programCode}/${quotaCode}/${sequence}`;
};

module.exports = { createAdmission, deleteAdmission, generateAdmissionNumber };
