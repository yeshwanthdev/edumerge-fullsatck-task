const rm = require('@root/rm');
const institutionModel = require('@model/institution.js');

// create institution
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const data = req.body;
		const result = await institutionModel.create(data);

		return responseService.success({ message: 'Institution created successfully', data: result.toObject() });
	} catch (error) {
		console.error('Error in creating institution:', error.message);
		return responseService.serverError(error);
	}
};

// getAll institution
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await institutionModel.find({ status: true }).sort({ dateCreated: -1 }).lean();
		return responseService.success({ message: 'Institutions fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching institution:', error.message);
		return responseService.serverError(error);
	}
};

// Update institution
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await institutionModel.updateOne({code}, updateData, { new: true, runValidators: true }).lean();

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

		const deleted = await institutionModel.updateOne({ code }, { status: false }, { new: true }).lean();

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
		const result = await institutionModel.findOne({ code: code, status: true }).sort({ dateCreated: -1 }).lean();
		return responseService.success({ message: 'Institutions fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching institution:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
