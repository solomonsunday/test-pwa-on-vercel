import { AxiosRequestConfig } from "axios";
import { getFunc, sendHttpRequest } from "./common/request";

export async function getTimeZones<TResponse>() {
	return getFunc<TResponse>({ path: '/utility/timezones' });
}

export async function getPermissions<TResponse>() {
	return getFunc<TResponse>({ path: '/utility/permissions' });
}

export async function getAzureSignedUrl<TResponse>(fileName: string) {
	return getFunc<TResponse>({
		path: '/media/presigned-token',
		options: {
			params: { file_name: fileName }
		}
	});
}

export async function uploadFileToAzureBlob<TResponse>(options: AxiosRequestConfig) {
	const response = await sendHttpRequest<TResponse>(options);
	if (response.status.toString().startsWith('2')) {
		return {
			isSuccess: true,
			url: response?.config?.url?.split('?').at(0)!
		}
	}
	return { isSuccess: false, url: null }
}