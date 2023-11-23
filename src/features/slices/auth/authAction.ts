// authActions.js
import { deleteAuthData, saveAuthData } from "@/common/utility";
import { AuthService } from "@/features/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse, UserForgotResetPassswordDto, UserLoginDto, UserRegisterDto } from "./authInterface";
import Router from "next/router";

export const userRegister = createAsyncThunk<any, UserRegisterDto>(
	"auth/register",
	async (payload, { rejectWithValue, fulfillWithValue }) => {
		try {
			const response = await AuthService.registerUser<IAuthResponse>(payload);
			saveAuthData({ token: response.data?.token, user: response.data?.user });
			return fulfillWithValue(response);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);


export const userLogin = createAsyncThunk<any, UserLoginDto>(
	"auth/login",
	async (payload, { rejectWithValue, fulfillWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const response = await AuthService.loginUser<IAuthResponse>(payload);
			saveAuthData({ token: response.data?.token, user: response.data?.user });
			return fulfillWithValue(response);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export async function verifyAccount(token: string): Promise<string> {
	const response = await AuthService.verifyAccount({ token });
	return response.message;
}

export async function resendVerification() {
	const response = await AuthService.resendVerification();
	return response.message;
}

export async function forgotPassword(payload: UserForgotResetPassswordDto) {
	const response = await AuthService.forgotPassword(payload);
	return response.message;
}

export async function resetPassword(payload: UserForgotResetPassswordDto) {
	const response = await AuthService.resetPassword(payload);
	return response.message;
}

export const persistAuthentication = createAsyncThunk<any, IAuthResponse>(
	"auth/persist",
	async (payload, { fulfillWithValue }) => {
		return fulfillWithValue({ data: payload });
	}
);

export const logOut = createAsyncThunk(
	"auth/logout",
	async (payload, { fulfillWithValue }) => {
		deleteAuthData();
		Router.push("/login");
		return fulfillWithValue(null);
	}
);
