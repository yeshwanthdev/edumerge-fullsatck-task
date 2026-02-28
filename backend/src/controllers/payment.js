const rm = require('@root/rm');
const paymentModel = require('@model/payment.js');
const admissionModel = require('@model/admission.js');
const { generateAdmissionNumber } = require('../wrappers/admission');

// getAll
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await paymentModel
			.find({ status: true })
			.populate('admissionId', 'firstName code admissionNumber')
			.sort({ dateCreated: -1 })
			.lean();
		return responseService.success({ message: 'Paginate fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching institution:', error.message);
		return responseService.serverError(error);
	}
};

// Update
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const result = await paymentModel.findOneAndUpdate({ code }, updateData, { new: true, runValidators: true }).lean();
		const admissionNumber = await generateAdmissionNumber(result.admissionId);
		await admissionModel.updateOne(
			{ _id: result.admissionId, status: true },
			{
				$set: {
					isFeePaid: true,
					recordStatus: rm.enums.admissionStatus.completed,
					isAdmissionGenerated: true,
					admissionNumber,
				},
			}
		);

		return responseService.success({ message: 'Payment updated successfully', data: result });
	} catch (error) {
		console.error('Error in updating institution:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { paginate, update };
