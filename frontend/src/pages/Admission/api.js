import * as yup from 'yup';
import * as RM from '@root/rm';
import { http as HTTP } from '@root/utils/http';
const modelUrl = 'admission';

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
export const breadcrumbs = [{ title: 'Admission' }];
export const columns = [
	{ field: 'firstName', headerName: 'Title', width: 200 },
	{ field: 'seatMatrix', headerName: 'Program', width: 200, valueGetter: (value) => value?.program?.name },
	{ field: 'institution', headerName: 'Institution', width: 200, valueGetter: (value) => value?.name },
	{ field: 'academicYear', headerName: 'Academic Year', width: 200 },
	{ field: 'quota', headerName: 'Quota', width: 200, valueGetter: (value) => value?.name },
	{ field: 'applicationNumber', headerName: 'Application Number', width: 200 },
	{ field: 'recordStatus', headerName: 'Admission Status', width: 200 },
];

export const customDataSource = {
	getRows: async (params) => {
		try {
			const response = await HTTP.get('/admission');
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
	firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
	lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	phone: yup
		.number()
		.typeError('Phone must be a number')
		.required('Phone number is required')
		.test('len', 'Phone must be 10 digits', (val) => val && val.toString().length === 10),
	academicYear: yup
		.number()
		.typeError('Academic year must be a number')
		.required('Academic year is required')
		.integer('Academic year must be an integer')
		.min(2000, 'Academic year seems too early')
		.max(new Date().getFullYear() + 1, 'Academic year cannot be in the far future'),
	institution: yup.object().required('Institution is required').nullable(),
	campus: yup.object().required('Campus is required').nullable(),
	quota: yup.object().required('Quota is required').nullable(),
	applicationNumber: yup.string().trim(),
	courseType: yup.string().trim().required('Course Type is required'),
	seatMatrix: yup.object().required('Seat Matrix is required').nullable(),
	admissionNumber: yup.string().trim(),
	isAdmissionGenerated: yup.boolean().default(false),
	isFeePaid: yup.boolean().default(false),
	isDocumentVerified: yup.boolean(),
});

export const handleSubmit = async (isCreateNewRecord, values) => {
	try {
		if (isCreateNewRecord) {
			await createNewRecord({
				...values,
				code: RM.uuid(),
			});
			return;
		}

		await updateExistingRecord({ ...values });
	} catch (error) {}
};
