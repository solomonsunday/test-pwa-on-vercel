import {
	IBaseMongoId,
	IBaseNamesEmailPhoneNumber,
	IBaseCreateEditDate,
	IBasePermissions,
} from "@/common/base.interface";

export interface IUser extends IBaseMongoId,
	IBaseNamesEmailPhoneNumber,
	IBaseCreateEditDate, IBasePermissions {
	profileImage: string;
	userType: UserType;
	isVerified: boolean;
	verifiedDate: string;
	isSuspended: boolean;
	isDeactivated: boolean;
	password: string;
	settings: IUserSettings;
}

export interface IUserSettings {
	acceptTermsCondition: boolean;
	acceptSmsNotification: boolean;
	acceptEmailNotification: boolean;
}

export enum UserTypeEnum {
	USER = "user",
	ADMIN = "admin",
}
export type UserType = `${UserTypeEnum}`;
