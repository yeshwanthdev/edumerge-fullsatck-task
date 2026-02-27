import * as yup from 'yup';
import * as RM from '@root/rm';
import { http as HTTP } from '@root/utils/http';
const modelUrl = 'seatMatrix';

export const createNewRecord = async (data) => {
	let response = {};
	try {
		response = await HTTP.post(modelUrl + '/', data);
	} catch (err) {
		console.error('Error in create api ' + err);
		throw err;
	}
	return response.data;
};

export const getSingleRecord = async (code) => {
	const getUrl = modelUrl + '/' + code;
	let response = {};
	try {
		response = await HTTP.get(getUrl);
	} catch (err) {
		console.error('Error while reading api ' + err);
		throw err;
	}
	return response.data;
};

export const deleteSingleRecord = async (code) => {
	const deleteUrl = modelUrl + '/' + code;
	let response = {};
	try {
		response = await HTTP.delete(deleteUrl);
	} catch (err) {
		console.error('Error while reading api ' + err);
		throw err;
	}
	return response.data;
};

export const updateExistingRecord = async (data) => {
	const updateurl = modelUrl + '/' + data.code;
	let response = {};
	try {
		response = await HTTP.put(updateurl, data);
	} catch (err) {
		console.error('Error while updating' + err);
		throw err;
	}
	return response.data;
};

// breadcrums
export const breadcrumbs = [{ title: 'Seat Matrix' }];
export const columns = [
	{ field: 'program', headerName: 'Program', width: 200, valueGetter: (value) => value.name },
	{ field: 'totalIntake', headerName: 'Total Intake', width: 200 },
	{
		field: 'quotas',
		headerName: 'Quotas',
		width: 350,
		valueGetter: (value) => value.quotas?.quotas.map((q) => q.type?.name).join(', '),
	},
];

export const customDataSource = {
	getRows: async (params) => {
		try {
			const response = await HTTP.get('/seatMatrix');
			const data = response.data.data;

			return {
				rows: data,
				rowCount: data.length,
			};
		} catch (error) {
			console.error('Error fetching rows:', error);
			throw error;
		}
	},
};

//change later min number
const quotaSchema = yup.object().shape({
	type: yup.object().required('Quota is required').nullable(),
	total: yup.number().typeError('Seats must be a number').min(0, 'Seats cannot be negative').required('Seats are required'),
});
export const validationSchema = yup.object().shape({
	program: yup.object().required('Program is required').nullable(),
	totalIntake: yup
		.number()
		.typeError('Total Intake must be a number')
		.min(1, 'Total Intake must be at least 1')
		.required('Total Intake is required'),
	quotas: yup.array().of(quotaSchema).min(1, 'At least one quota is required').required('Quotas are required'),
});
export const handleSubmit = async (isCreateNewRecord, values) => {
	try {
		if (isCreateNewRecord) {
			await createNewRecord({
				program: values.program,
				totalIntake: values.totalIntake,
				quotas: values.quotas,
				quotaStatus: attachQuotaStats(values.quotas),
				code: RM.uuid(),
			});
			return;
		}

		await updateExistingRecord({
			code: values.code,
			program: values.program,
			totalIntake: values.totalIntake,
			quotas: values.quotas,
			quotaStatus: attachQuotaStats(values.quotas),
		});
	} catch (error) {
		console.log(error);
	}
};

export const attachQuotaStats = (quotas = []) => {
	const quotaStats = {};
	quotas.forEach((q) => {
		const quotaId = q?.type?._id || q?.type;

		if (!quotaId) return;

		quotaStats[quotaId] = {
			total: Number(q.total) || 0,
			filled: Number(q.filled) || 0,
		};
	});

	return quotaStats;
};
