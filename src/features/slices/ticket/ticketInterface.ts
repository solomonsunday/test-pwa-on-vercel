import { IBaseMongoId, IBaseCreateEditDate, IBaseReferenceId } from "@/common/base.interface";
import { IEvent } from "../event/eventInterface";
import { IPayment } from "../payment/paymentInterface";
import { IUser } from "../user/userInterface";

export interface ITicket extends IBaseMongoId, IBaseCreateEditDate,IBaseReferenceId {
	paymentId: string;
	payment?: IPayment;
	eventId: string;
	type: 'paid';
	event?: IEvent;
	userId: string;
	user?: IUser;
	assignedBy?: IUser;
	ticketId: string;
}

export interface CreateTicketDto extends Pick<ITicket, 'eventId'> {
	email: string;
}