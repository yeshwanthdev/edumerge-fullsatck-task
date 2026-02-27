const rm = require('@root/rm');
const mongoose = require('mongoose');
const admissionModel = require('@model/admission');
const seatMatrixModel = require('@model/seatMatrix');

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
			{
				_id: seatMatrixId,
				[`quotaStatus.${quotaId}.filled`]: { $lt: quotaData.total },
			},
			{
				$inc: { [`quotaStatus.${quotaId}.filled`]: 1 },
			},
			{ session }
		);

		if (seatUpdate.modifiedCount === 0) throw new Error('Quota Full');

		//create Admission and set seat locked
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

		await session.commitTransaction();
		session.endSession();

		return admission[0];
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

module.exports = { createAdmission };
