import { AxiosRequestConfig } from "axios";

import { IUser, IUserSettings } from "../slices/user/userInterface";
import { getFunc, patchFunc } from "./common/request";


export async function getAllUsersForAdmin<TResponse>(options?: AxiosRequestConfig<any>) {
	return getFunc<TResponse>({ path: '/user/admin/get', options });
}

export async function getProfile<TResponse>() {
	return getFunc<TResponse>({ path: '/user/profile' });
}

export async function verifyAccount<TResponse>(payload: any) {
	return patchFunc<TResponse>({ path: '/user/', payload });
}

export async function updateUserPermissions<TResponse>(payload: Pick<IUser, '_id' | 'userType' | 'permissions'>) {
	return patchFunc<TResponse>({
		path: `/user/admin/update/${payload._id}/permission`,
		payload
	});
}

export async function updateProfileNotification<TResponse>(payload: Partial<Readonly<IUserSettings>>) {
	return patchFunc<TResponse>({ path: '/user/profile/update/notification', payload });
}

export async function suspendUnsuspendUser<TResponse>(user: Pick<IUser, '_id' | 'isSuspended'>) {
	return patchFunc<TResponse>({
		path: `/user/admin/suspendUnsuspend/${user?._id}`,
		payload: { isSuspended: user?.isSuspended },
	});
}
