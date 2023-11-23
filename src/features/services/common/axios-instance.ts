import axios, { AxiosError, Method } from "axios";

import { IBaseErrorObject } from "@/common/base.interface";
import { getUserTimeZone } from "@/common/utility";

export const getAxiosInstance = () => {
	// cancel previous http request https://www.youtube.com/watch?v=cIwpavIhI84

	const baseURL = getBaseUrl();
	const instance = axios.create({ baseURL });

	instance.interceptors.response.use(
		({ data }) => {
			return { success: true, ...data };
		},
		(error: AxiosError<{ error: IBaseErrorObject }>) => {
			let errorObject: IBaseErrorObject;
			const originalRequest = error.config as any;
			if (error.response && (error.response?.status > 399 && error.response?.status < 600)) {
				errorObject = error?.response?.data?.error
			} else {
				errorObject = {
					statusCode: error.response?.status || 500,
					message: error.response?.statusText!,
					path: error.config?.url,
					method: error.config?.method as Method
				};
			};

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
			}
			console.log("TCL: error", { ...errorObject });
			return Promise.reject({ ...errorObject });
		}
	);

	instance.interceptors.request.use(
		(config) => {
			if (!window.navigator.onLine) {
				return Promise.reject({
					error: { response: { message: "No internet connection!" } }
				});
			}
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			config.headers["client_time_zone"] = getUserTimeZone();
			return config;
		},
		(error) => {
			return Promise.reject({ error });
		}
	);
	return instance;
};

function getBaseUrl(): string {
	// production = https://coventi-api.azurewebsites.net/api
	// staging = https://coventi-api.azurewebsites.net/api
	// staging = https://coventi-api-staging.azurewebsites.net/api

	const stageUrl = 'https://coventi-api-staging.azurewebsites.net/api';
	const productionUrl = 'https://coventi-api-staging.azurewebsites.net/api';
	const environment = process.env.NODE_ENV as any;
	switch (environment) {
		case 'development':
			return process.env.NEXT_PUBLIC_BASEURL || stageUrl;
		case 'staging':
			return stageUrl;
		case 'production':
			return productionUrl;
		default:
			return process.env.NEXT_PUBLIC_BASEURL || stageUrl;

	}
}
