import { AxiosRequestConfig } from "axios";

import { getFunc } from "./common/request";

export function UsersEvents<TResponse>(
  options?: Omit<AxiosRequestConfig<any>, "url">
) {
  return getFunc<TResponse>({ path: `/ticket/get`, options });
}
