import { IUser } from "@/features/slices/user/userInterface";
import { Method } from "axios";

export interface IBaseMongoId {
	_id?: string;
	// id?: string;
}

export interface IBaseNamesEmailPhoneNumber {
	firstName: string;
	surName: string;
	contact: {
		phoneNumber?: string;
		email: string;
	};
}

export interface IBaseCreateEditDate {
	dateCreated: string;
	dateModified?: string;
}

export interface IBaseCreatorEditorId {
	createdByUserId: string;
	lastModifiedByUserId?: string;
	createdBy?: IUser;
	lastModifiedBy?: IUser;
}

export interface IBaseReferenceId {
	referenceId: string;
}

export interface IBaseIsDelete {
	isDeleted: boolean; // default is false
	dateDeleted?: string;
	deletedByUserId?: string;
	deletedBy?: IUser;
}


export interface IBasePermissions {
	permissions: string[];
}

export interface IBaseApiResponse<TEntity> {
	success: boolean;
	message: string;
	data: TEntity;
}

export interface IBaseErrorObject {
	message: string;
	method?: Method;
	path?: string;
	statusCode?: number;
	timestamp?: string;
}

export interface IBaseState<TEntity> {
	loading?: boolean;
	data: TEntity | null;
	error?: IBaseErrorObject | null;
	success?: boolean;
}

interface IPermissionsSub {
	assignPermission: string;
	view: string;
	add: string;
	edit: string;
	delete: string;
}

export interface IAdminPermissionsDefinitions {
	readonly event: Omit<IPermissionsSub, "view" | "assignPermission">;
	readonly mersh: Omit<IPermissionsSub, "view" | "assignPermission">;
	readonly user: Omit<IPermissionsSub, "delete" | "add">;
	readonly payment: Pick<IPermissionsSub, "view" | "edit">;
	readonly tag: Omit<IPermissionsSub, "view" | "assignPermission">;
	readonly ticket: Pick<IPermissionsSub, "view" | "add">;
	readonly merch: Omit<IPermissionsSub, "view" | 'assignPermission'>;
	// readonly video: Omit<IPermissionsSub, 'assignPermission'>;
}