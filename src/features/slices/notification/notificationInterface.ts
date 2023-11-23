export interface IAlert {
	id?: string;
	type?: AlertType;
	message: string;
}

export enum AlertTypeEnum {
	ERROR = "error",
	SUCCESS = "success",
	INFO = "info",
	// WARNING = "warning",
}
export type AlertType = `${AlertTypeEnum}`;
