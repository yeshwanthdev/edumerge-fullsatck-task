const rm = require('@root/rm');
const programModel = require('@model/program.js');

// create program
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const data = req.body;
		const result = await programModel.create(data);

		return responseService.success({
			message: 'Program created successfully',
			data: result.toObject(),
		});
	} catch (error) {
		console.error('Error in creating program:', error.message);
		return responseService.serverError(error);
	}
};

// getAll programs
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await programModel
			.find({ status: true })
			.populate('department', 'name code')
			.sort({ dateCreated: -1 })
			.lean();

		return responseService.success({
			message: 'Programs fetched successfully',
			data: result,
		});
	} catch (error) {
		console.error('Error in fetching programs:', error.message);
		return responseService.serverError(error);
	}
};

// Update program
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await programModel.updateOne({ code }, updateData, { new: true, runValidators: true }).lean();

		return responseService.success({ message: 'program updated successfully', data: updated });
	} catch (error) {
		console.error('Error in updating program:', error.message);
		return responseService.serverError(error);
	}
};

const remove = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;

		const deleted = await programModel.updateOne({ code }, { status: false }, { new: true }).lean();

		return responseService.success({ message: 'program deleted successfully', data: deleted });
	} catch (error) {
		console.error('Error in deleting program:', error.message);
		return responseService.serverError(error);
	}
};

// getByCode program
const getByCode = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const result = await programModel
			.findOne({ code: code, status: true })
			.populate('department', 'name code')
			.sort({ dateCreated: -1 })
			.lean();
		return responseService.success({ message: 'programs fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching program:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
