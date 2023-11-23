import { AxiosRequestConfig } from "axios";

import {
	CreateEventDto,
	EventStatusType,
	EventType,
	ISchedule,
	UpdateEventDto,
} from "@/features/slices/event/eventInterface";
import { postFunc, patchFunc, deleteFunc, getFunc } from "./common/request";

export function createEvent<TResponse>(createEventDto: CreateEventDto) {
	return postFunc<TResponse>({
		path: "/event/admin/create",
		payload: createEventDto,
		// options: { headers: { "Content-Type": 'application/x-www-form-urlencoded' } }
	});
}

export function getEvents<TResponse>(
	options?: Omit<AxiosRequestConfig<any>, "url">
) {
	return getFunc<TResponse>({ path: `/event/public/get`, options });
}

export function getHomeEvents<TResponse>() {
	return getFunc<TResponse>({ path: `/event/public/get/homepage` });
}

export function getOneEvent<TResponse>({ eventId }: { eventId: string }) {
	return getFunc<TResponse>({ path: `/event/public/get/${eventId}` });
}

export function getEventStreamData<TResponse>({
	eventId,
}: {
	eventId: string;
}) {
	return getFunc<TResponse>({
		path: `/event/admin/get/${eventId}/stream-data`,
	});
}

export function getUserEventStreamData<TResponse>({
	eventId,
}: {
	eventId: string;
}) {
	return getFunc<TResponse>({
		path: `/event/get/${eventId}/stream-data`,
	});
}

export function confirmTicketOwner<TResponse>({
	eventId,
}: {
	eventId: string;
}) {
	return getFunc<TResponse>({
		path: `/ticket/${eventId}`,
	});
}

export function updateEvent<TResponse>({
	eventId,
	updateEventDto,
}: {
	eventId: string;
	updateEventDto: UpdateEventDto;
}) {
	return patchFunc<TResponse>({
		path: `/event/admin/update/${eventId}`,
		payload: updateEventDto,
	});
}

export function updateEventType<TResponse>({ eventId, type }: { eventId: string, type: EventType }) {
	return patchFunc<TResponse>({
		path: `/event/admin/update/${eventId}/type`,
		payload: { type }
	});
}

export function updateEventStatus<TResponse>({ eventId, status }: {
	eventId: string;
	status: EventStatusType;
}) {
	return patchFunc<TResponse>({
		path: `/event/admin/update/${eventId}/status`,
		payload: { status },
	});
}

export function updateEventSchedules<TResponse>({ eventId, schedules }: {
	eventId: string;
	schedules: ISchedule[];
}) {
	return patchFunc<TResponse>({
		path: `/event/admin/update/${eventId}/schedules`,
		payload: { schedules },
	});
}

export function deleteEvent<TResponse>({ eventId }: { eventId: string }) {
	return deleteFunc({ path: `/event/admin/update/status/${eventId}` });
}
