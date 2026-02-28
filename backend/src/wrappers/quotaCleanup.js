'use strict';
require('../../config/module-alias')();

const rm = require('@root/rm');
const mongoose = require('mongoose');
const seatMatrixModel = require('@model/seatMatrix');
const admissionModel = require('@model/admission');
const paymentModel = require('@model/payment');

const init = async () => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const now = rm.moment(new Date()).utc().toISOString();
		const query = {
			recordStatus: rm.enums.admissionStatus.pending,
			isFeePaid: false,
			lockExpiresAt: { $lt: now },
			status: true,
		};

		//getting expired admissions
		const expiredAdmissions = await admissionModel.find(query).select('_id seatMatrix quota').session(session);

		for (const admission of expiredAdmissions) {
			const seatMatrixId = admission.seatMatrix;
			const quotaId = admission.quota.toString();

			//update admission
			const admissionUpdate = await admissionModel.updateOne(
				{ _id: admission._id, recordStatus: rm.enums.admissionStatus.pending, isFeePaid: false, status: true },
				{ $set: { status: false } },
				{ session }
			);

			if (admissionUpdate.modifiedCount === 0) continue;

			//decrement seat only if still active
			await seatMatrixModel.updateOne(
				{ _id: seatMatrixId, [`quotaStatus.${quotaId}.filled`]: { $gt: 0 }, status: true },
				{ $inc: { [`quotaStatus.${quotaId}.filled`]: -1 } },
				{ session }
			);

			//update payment
			await paymentModel.updateMany(
				{ admissionId: admission._id, recordStatus: rm.enums.paymentStatus.pending, status: true },
				{ $set: { status: false } },
				{ session }
			);
		}

		await session.commitTransaction();
		session.endSession();

		console.log(`Expired ${expiredAdmissions.length} admissions`);
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error('Cleanup error:', error);
	}
};

module.exports = init;
