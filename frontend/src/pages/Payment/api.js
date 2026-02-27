import * as yup from 'yup';
import * as RM from '@root/rm';
import { http as HTTP } from '@root/utils/http';
const modelUrl = 'payment';

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
export const breadcrumbs = [{ title: 'Payment' }];
export const columns = [
	{
		field: 'firstName',
		headerName: 'Title',
		width: 200,
		valueGetter: (value, row) => row?.admissionId?.firstName || '',
	},
	{
		field: 'recordStatus',
		headerName: 'Payment Status',
		width: 200,
	},
	{
		field: 'admissionNumber',
		headerName: 'Admission Number',
		width: 200,
		valueGetter: (value, row) => row?.admissionId?.admissionNumber || '-',
	},
];
export const customDataSource = {
	getRows: async (params) => {
		try {
			const response = await HTTP.get('/payment');
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

// objectpage
export const validationSchema = yup.object().shape({
	name: yup.string().trim().required('Name is required'),
	description: yup.string().trim().required('Description is required'),
});
export const handleSubmit = async (code) => {
	try {
		await updateExistingRecord({
			code: code,
			recordStatus: 'COMPLETED',
		});
	} catch (error) {}
};
