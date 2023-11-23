import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { getAxiosInstance } from "./axios-instance";
import { IBaseApiResponse } from "@/common/base.interface";

export async function postFunc<TResponse, TBody extends Record<string, any> = {}>({
	path,
	payload,
	options,
}: {
	path: string;
	payload: TBody;
	options?: AxiosRequestConfig;
}) {
	const axios = getAxiosInstance();
	const response = await axios.post(path, payload, options);
	return response as unknown as IBaseApiResponse<TResponse>;
}

export function getFunc<TResponse>({
	path,
	options,
}: {
	path: string;
	options?: AxiosRequestConfig;
}) {
	const axios = getAxiosInstance();
	return axios.get<TResponse>(path, options);
}

export async function patchFunc<TResponse, TBody extends object = {}>({
	path,
	payload,
	options,
}: {
	path: string;
	payload: TBody;
	options?: AxiosRequestConfig;
}) {
	const axios = getAxiosInstance();
	const response = await axios.patch<TResponse>(path, payload, options);
	return response as unknown as IBaseApiResponse<any>;
}

export async function deleteFunc({
	path,
	options,
}: {
	path: string;
	options?: AxiosRequestConfig;
}) {
	const axios = getAxiosInstance();
	const response = await axios.delete(path, options);
	return response as unknown as IBaseApiResponse<any>;
}

export async function sendHttpRequest<TResponse, TBody extends Object = {}>(
	options: AxiosRequestConfig<TBody>
) {
	return axios(options) as unknown as AxiosResponse<TResponse, TBody>;
}
