const rm = require('@root/rm');
const quotaModel = require('@model/quota.js');

// create quota
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const data = req.body;

		const result = await quotaModel.create(data);

		return responseService.success({
			message: 'Quota created successfully',
			data: result.toObject(),
		});
	} catch (error) {
		console.error('Error in creating quota:', error.message);
		return responseService.serverError(error);
	}
};

// get all quotas
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await quotaModel.find({ status: true }).sort({ dateCreated: -1 }).lean();

		return responseService.success({
			message: 'Quotas fetched successfully',
			data: result,
		});
	} catch (error) {
		console.error('Error in fetching quotas:', error.message);
		return responseService.serverError(error);
	}
};


// Update institution
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await quotaModel.updateOne({code}, updateData, { new: true, runValidators: true }).lean();

		return responseService.success({ message: 'Institution updated successfully', data: updated });
	} catch (error) {
		console.error('Error in updating institution:', error.message);
		return responseService.serverError(error);
	}
};

const remove = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;

		const deleted = await quotaModel.updateOne({ code }, { status: false }, { new: true }).lean();

		return responseService.success({ message: 'Institution deleted successfully', data: deleted });
	} catch (error) {
		console.error('Error in deleting institution:', error.message);
		return responseService.serverError(error);
	}
};

// getByCode institution
const getByCode = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const result = await quotaModel.findOne({ code: code, status: true }).sort({ dateCreated: -1 }).lean();
		return responseService.success({ message: 'Institutions fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching institution:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
