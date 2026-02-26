import * as yup from 'yup';
import * as RM from '@root/rm';
import { http as HTTP } from '@root/utils/http';
const modelUrl = 'campus';

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
export const breadcrumbs = [{ title: 'Campus' }];
export const columns = [
	{ field: 'name', headerName: 'Title', width: 200 },
	{ field: 'description', headerName: 'Description', width: 200 },
	{ field: 'institution', headerName: 'Institution', width: 200, valueGetter: (value) => value.name },
];
export const customDataSource = {
	getRows: async (params) => {
		try {
			const response = await HTTP.get('/campus');
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
	institution: yup.object().required('Institution is required').nullable(),
});
export const handleSubmit = async (isCreateNewRecord, values) => {
	try {
		if (isCreateNewRecord) {
			await createNewRecord({
				name: values.name,
				description: values.description,
				institution: values.institution,
				code: RM.uuid(),
			});
			return;
		}

		await updateExistingRecord({
			code: values.code,
			name: values.name,
			description: values.description,
			institution: values.institution,
		});
	} catch (error) {
		console.log(error);
	}
};
