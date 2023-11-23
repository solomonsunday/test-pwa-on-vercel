import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserService } from "../../services";
import { IUser, IUserSettings } from "./userInterface";


// Get all user on the platform for admin.
export const getAllUsers = createAsyncThunk<any, {}>(
	"user/admin/user",
	async (payload, { rejectWithValue, fulfillWithValue }) => {
		try {
			const response = await UserService.getAllUsersForAdmin<{
				data: IUser;
			}>({ params: payload });
			return fulfillWithValue(response.data);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export async function getProfile(): Promise<{ user: IUser; }> {
	const response = await UserService.getProfile<{ user: IUser }>();
	return response.data;
}

export async function updateProfile() {
	// const response = await UserService.getProfile()
}

export async function updateProfileNotification(payload: Partial<Readonly<IUserSettings>>) {
	const response = await UserService.updateProfileNotification(payload);
	return response.message;
}

export async function updateUserPermissions(userDto: Pick<IUser, '_id' | 'userType' | 'permissions'>) {
	const response = await UserService.updateUserPermissions(userDto);
	return response.message;
}

export async function suspendUnsuspendUser(user: Pick<IUser, '_id' | 'isSuspended'>) {
	const response = await UserService.suspendUnsuspendUser<{ message: string }>(user);
	return response.data;
}