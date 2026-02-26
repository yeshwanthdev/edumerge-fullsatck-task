const rm = require('@root/rm');
const departmentModel = require('@model/department.js');

// create department
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const data = req.body;
		const result = await departmentModel.create(data);

		return responseService.success({
			message: 'Department created successfully',
			data: result.toObject(),
		});
	} catch (error) {
		console.error('Error in creating department:', error.message);
		return responseService.serverError(error);
	}
};

// getAll departments (paginate)
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await departmentModel.find({ status: true }).sort({ dateCreated: -1 }).lean();

		return responseService.success({
			message: 'Departments fetched successfully',
			data: result,
		});
	} catch (error) {
		console.error('Error in fetching departments:', error.message);
		return responseService.serverError(error);
	}
};

// Update Department
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await departmentModel.updateOne({ code }, updateData, { new: true, runValidators: true }).lean();

		return responseService.success({ message: 'Department updated successfully', data: updated });
	} catch (error) {
		console.error('Error in updating Department:', error.message);
		return responseService.serverError(error);
	}
};

const remove = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;

		const deleted = await departmentModel.updateOne({ code }, { status: false }, { new: true }).lean();

		return responseService.success({ message: 'Department deleted successfully', data: deleted });
	} catch (error) {
		console.error('Error in deleting Department:', error.message);
		return responseService.serverError(error);
	}
};

// getByCode Department
const getByCode = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const result = await departmentModel.findOne({ code: code, status: true }).sort({ dateCreated: -1 }).lean();
		return responseService.success({ message: 'Departments fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching Department:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
