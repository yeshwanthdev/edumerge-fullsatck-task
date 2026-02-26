import * as RM from '@root/rm';
import axios from 'axios';
// import { commonConfig } from "../rm";

export const http = axios.create({
	baseURL: RM.commonConfig.apiBaseUrl,
	withCredentials: true,
});
