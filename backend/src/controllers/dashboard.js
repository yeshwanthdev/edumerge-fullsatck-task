const rm = require('@root/rm');
const seatMatrixModel = require('@model/seatMatrix.js');
const admissionModel = require('@model/admission.js');
const { formateData } = require('@wrapper/dashboard');

// create campus
const getAllottedSeats = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	try {
		const aggregationResult = await seatMatrixModel.aggregate([
			{
				$project: {
					quotas: { $objectToArray: '$quotaStatus' },
				},
			},
			{ $unwind: '$quotas' },
			{
				$addFields: {
					quotaObjectId: { $toObjectId: '$quotas.k' },
				},
			},
			{
				$group: {
					_id: '$quotaObjectId',
					totalAllotedSeats: { $sum: '$quotas.v.total' },
				},
			},
			{
				$lookup: {
					from: 'quotas',
					localField: '_id',
					foreignField: '_id',
					as: 'quotaInfo',
				},
			},
			{ $unwind: { path: '$quotaInfo', preserveNullAndEmptyArrays: true } },
			{
				$project: {
					quotaId: '$_id',
					quotaName: '$quotaInfo.name',
					totalAllotedSeats: 1,
					_id: 0,
				},
			},
			{ $sort: { quotaName: 1 } },
		]);

		const result = formateData(aggregationResult);

		return responseService.success({ message: 'Campus created successfully', data: result });
	} catch (error) {
		console.error('Error in creating campus:', error.message);
		return responseService.serverError(error);
	}
};

const getProgramSeats = async (req, res) => {
	const responseService = new rm.responseService(req, res);
	const aggregateQuery = [
		{
			$project: {
				program: 1,
				quotas: { $objectToArray: '$quotaStatus' },
			},
		},
		{ $unwind: '$quotas' },
		{
			$group: {
				_id: '$program',
				totalAllotedSeats: { $sum: '$quotas.v.total' },
				filledSeats: { $sum: '$quotas.v.filled' },
			},
		},
		{
			$addFields: {
				remainingSeats: { $subtract: ['$totalAllotedSeats', '$filledSeats'] },
			},
		},
		{
			$lookup: {
				from: 'programs',
				localField: '_id',
				foreignField: '_id',
				as: 'programInfo',
			},
		},
		{ $unwind: '$programInfo' },
		{
			$project: {
				program_id: '$_id',
				programName: '$programInfo.name',
				totalAllotedSeats: 1,
				filledSeats: 1,
				remainingSeats: 1,
				_id: 0,
			},
		},
	];

	try {
		const aggregationResult = await seatMatrixModel.aggregate(aggregateQuery);

		const xLabels = aggregationResult.map((item) => item.programName);
		const totalData = aggregationResult.map((item) => item.totalAllotedSeats);
		const filledData = aggregationResult.map((item) => item.filledSeats);
		const remainingData = aggregationResult.map((item) => item.remainingSeats);

		const result = { xLabels, totalData, filledData, remainingData };

		return responseService.success({ message: 'successfully', data: result });
	} catch (error) {
		console.error('Error in creating campus:', error.message);
		return responseService.serverError(error);
	}
};

const getAdmissionDetails = async (req, res) => {
	const responseService = new rm.responseService(req, res);

	try {
		const pendingAdmissions = await admissionModel.countDocuments({
			status: true,
			recordStatus: rm.enums.admissionStatus.pending,
		});
		const totalAdmissions = await admissionModel.countDocuments({ status: true });
		const percentageFilled = (pendingAdmissions / totalAdmissions) * 100;

		const result = { pendingAdmissions, totalAdmissions, percentageFilled };

		return responseService.success({ message: '', data: result });
	} catch (error) {}
};
module.exports = { getAllottedSeats, getProgramSeats, getAdmissionDetails };
