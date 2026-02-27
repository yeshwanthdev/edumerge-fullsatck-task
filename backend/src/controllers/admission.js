const rm = require('@root/rm');
const admissionModel = require('@model/admission.js');
const { createAdmission } = require('@wrapper/admission');

// create admission
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const data = req.body;
		const result = await createAdmission(data);
		// const result = await admissionModel.create(data);

		return responseService.success({ message: 'Idmission created successfully', data: [] });
	} catch (error) {
		console.error('Error in creating admission:', error.message);
		return responseService.serverError(error);
	}
};

// getAll admission
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const result = await admissionModel
			.find({ status: true })
			.populate('institution', 'name code')
			.populate('campus', 'name code')
			.populate('quota')
			.populate({
				path: 'seatMatrix',
				select: 'program code',
				populate: {
					path: 'program',
					model: 'Program',
					select: 'name code',
				},
			})
			.sort({ dateCreated: -1 })
			.lean();
		return responseService.success({ message: 'Institutions fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching admission:', error.message);
		return responseService.serverError(error);
	}
};

// Update admission
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await admissionModel.updateOne({ code }, updateData, { new: true, runValidators: true }).lean();

		return responseService.success({ message: 'Idmission updated successfully', data: updated });
	} catch (error) {
		console.error('Error in updating admission:', error.message);
		return responseService.serverError(error);
	}
};

const remove = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;

		const deleted = await admissionModel.updateOne({ code }, { status: false }, { new: true }).lean();

		return responseService.success({ message: 'Idmission deleted successfully', data: deleted });
	} catch (error) {
		console.error('Error in deleting admission:', error.message);
		return responseService.serverError(error);
	}
};

// getByCode admission
const getByCode = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;

		const result = await admissionModel
			.findOne({ code: code, status: true })
			.populate('institution', 'name code')
			.populate('campus', 'name code')
			.populate('quota')
			.populate({
				path: 'seatMatrix',
				populate: {
					path: 'program',
					model: 'Program',
					select: 'name code',
				},
			});
		return responseService.success({ message: 'Institutions fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching admission:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
