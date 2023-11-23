import { AxiosRequestConfig } from "axios";
import { UpdateTagDto } from "../slices/tag/tagInterface";
import { CreateTicketDto } from "../slices/ticket/ticketInterface";
import { deleteFunc, getFunc, patchFunc, postFunc } from "./common/request";

export async function createTicket<TResponse>(createTagDto: CreateTicketDto) {
	return postFunc<TResponse>({
		path: "/ticket/admin/create",
		payload: createTagDto,
	});
}

export async function getTickets<TResponse>(options?: AxiosRequestConfig<any>) {
	return getFunc<TResponse>({ path: "/ticket/admin/get" });
}

// export async function getIsTicketPaidFor<TResponse>(options?: AxiosRequestConfig<any>) {
// 	return getFunc<TResponse>({ path: '/ticket/get/${eventId}' });

// }

export function getIsTicketPaidFor<TResponse>(eventId: string) {
	return getFunc<TResponse>({ path: `/ticket/${eventId}` });
}

export async function updateTicket<TResponse>({
	tagId,
	updateTagDto,
}: {
	tagId: string;
	updateTagDto: UpdateTagDto;
}) {
	return patchFunc<TResponse>({
		path: `/ticket/admin/update/${tagId}`,
		payload: updateTagDto,
	});
}

export async function deleteTag(tagId: string) {
	return deleteFunc({ path: `/ticket/admin/delete/${tagId}` });
}
