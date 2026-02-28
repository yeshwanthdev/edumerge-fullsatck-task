import * as RM from '@root/rm';
import { http as HTTP } from '@root/utils/http';
const modelUrl = 'dashboard';

export const getAllottedSeats = async () => {
	let response = {};
	try {
		response = await HTTP.get(modelUrl + '/' + 'getAllottedSeats');
	} catch (err) {
		console.error('Error in getAllottedSeats api ' + err);
		throw err;
	}
	return response.data.data;
};
export const getProgramSeats = async () => {
	let response = {};
	try {
		response = await HTTP.get(modelUrl + '/' + 'getProgramSeats');
	} catch (err) {
		console.error('Error in getProgramSeats api ' + err);
		throw err;
	}
	return response.data.data;
};
export const getAdmissionDetails = async () => {
	let response = {};
	try {
		response = await HTTP.get(modelUrl + '/' + 'getAdmissionDetails');
	} catch (err) {
		console.error('Error in getAdmissionDetails api ' + err);
		throw err;
	}
	return response.data.data;
};
