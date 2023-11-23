import { UserLoginDto, UserRegisterDto } from "../slices/auth/authInterface";
import { postFunc, patchFunc } from "./common/request";


export const loginUser = <TResponse>(payload: UserLoginDto) =>
	postFunc<TResponse>({ path: "/auth/login", payload });

export const registerUser = async <TResponse>(payload: UserRegisterDto) =>
	postFunc<TResponse>({ path: "/auth/register", payload });

export const verifyAccount = async<TResponse>(payload: { token: string; }) =>
	patchFunc<TResponse>({ path: "/auth/verify", payload });

export const resendVerification = async <TResponse>() =>
	postFunc<TResponse>({ path: "/auth/verification/resend", payload: {} });

export const forgotPassword = async <TResponse>(payload: Pick<UserLoginDto, 'email'>) =>
	postFunc<TResponse>({ path: "/auth/forgot-password", payload });

export const resetPassword = async <TResponse>(payload: any) =>
	patchFunc<TResponse>({ path: "/auth/reset-password", payload });

export const getRefreshToken = () => {
	let refreshToken = localStorage.getItem("refreshToken");
	let payload = {
		refreshToken: refreshToken,
		isActive: true,
	};
	return postFunc({ path: "/refreshtoken", payload });
};
