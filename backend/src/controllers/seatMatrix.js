const rm = require('@root/rm');
const seatMatrixModel = require('@model/seatMatrix.js');

//change later
// CREATE seat matrix
const create = async (req, res) => {
	const responseService = new rm.responseService(req, res);

	try {
		const { program, totalIntake, quotas, code } = req.body;

		// // Basic validation
		// if (!program || !academicYear || !totalIntake || !quotas?.length) {
		// 	return responseService.badRequest('All fields are required');
		// }

		// Validate quota seat sum
		// const totalQuotaSeats = quotas.reduce((sum, q) => sum + q.seats, 0);

		// if (totalQuotaSeats !== totalIntake) return responseService.badRequest('Sum of quota seats must equal total intake');

		// Check duplicate program + academicYear
		// const existing = await seatMatrixModel.findOne({ program, academicYear });

		// if (existing) return responseService.badRequest('Seat matrix already exists for this program and academic year');

		const result = await seatMatrixModel.create({ code, program, totalIntake, quotas });

		return responseService.success({ message: 'Seat matrix created successfully', data: result.toObject() });
	} catch (error) {
		console.error('Error in creating seat matrix:', error.message);
		return responseService.serverError(error);
	}
};

// GET all seat matrices
const paginate = async (req, res) => {
	const responseService = new rm.responseService(req, res);

	try {
		const result = await seatMatrixModel
			.find({ status: true })
			.populate('program', 'name code')
			.populate('quotas.quota', 'name code isGovernmentQuota')
			.sort({ dateCreated: -1 })
			.lean();

		return responseService.success({
			message: 'Seat matrices fetched successfully',
			data: result,
		});
	} catch (error) {
		console.error('Error in fetching seat matrices:', error.message);
		return responseService.serverError(error);
	}
};

// Update institution
const update = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const { code } = req.params;
		const updateData = req.body;

		const updated = await seatMatrixModel.updateOne({ code }, updateData, { new: true }).lean();

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

		const deleted = await seatMatrixModel.updateOne({ code }, { status: false }, { new: true }).lean();

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
		const result = await seatMatrixModel
			.findOne({ code: code, status: true })
			.populate('program', 'name code')
			.populate('quotas.quota', 'name code isGovernmentQuota')
			.lean();
		return responseService.success({ message: 'Institutions fetched successfully', data: result });
	} catch (error) {
		console.error('Error in fetching institution:', error.message);
		return responseService.serverError(error);
	}
};

module.exports = { create, paginate, update, remove, getByCode };
