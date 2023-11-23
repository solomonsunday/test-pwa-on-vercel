import { IUser } from "../user/userInterface";

export interface UserRegisterDto extends UserLoginDto {
	readonly firstName: string;
	readonly surName: string;
	phoneNumber: string;
	readonly countryCode?: string;
}
export interface UserLoginDto {
	readonly email: string;
	readonly password: string;
}

export interface UserForgotResetPassswordDto extends UserLoginDto {
	readonly token: string;
}

export interface IAuthResponse {
	token: string;
	user: Pick<
		IUser,
		| "_id"
		| "firstName"
		| "surName"
		| "userType"
		| "permissions"
		| "isVerified"
		| "profileImage"
	>;
}
export interface IAuthenticatedUser extends IAuthResponse { }
