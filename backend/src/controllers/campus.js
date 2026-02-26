const rm = require('@root/rm');
const campusModel = require('@model/campus.js');

// create campus
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const data = req.body;
		const result = await campusModel.create(data);

		return responseService.success({ message: 'Campus created successfully', data: result.toObject() });
	} catch (error) {
		console.error('Error in creating campus:', error.message);
		return responseService.serverError(error);
	}
};

// getAll campus
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await campusModel
			.find({ status: true })
			.populate('institution', 'name code')
			.sort({ dateCreated: -1 })
			.lean();
		// .populate({ select: 'name', path: 'institution', model: 'Institution' })
		return responseService.success({ message: 'Campus fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching campus:', error.message);
		return responseService.serverError(error);
	}
};

// Update institution
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await campusModel.updateOne({ code }, updateData, { new: true, runValidators: true }).lean();

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

		const deleted = await campusModel.updateOne({ code }, { status: false }, { new: true }).lean();

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
		const result = await campusModel.findOne({ code, status: true }).populate('institution', 'name code').lean();

		return responseService.success({ message: 'Campus fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching campus:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
