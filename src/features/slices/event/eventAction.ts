import { createAsyncThunk } from "@reduxjs/toolkit";

import { EventService } from "@/features/services";
import {
	CreateEventDto,
	EventStatusType,
	IApiVideoLiveStream,
	IEvent,
	ISchedule,
	UpdateEventDto,
} from "./eventInterface";

export async function createEvent(createEventDto: CreateEventDto) {
	const { message } = await EventService.createEvent(createEventDto);
	return { message };
}

export async function getHomeEvents(): Promise<{
	past: IEvent[];
	live: IEvent[];
	upcoming: IEvent[];
}> {
	const response = await EventService.getHomeEvents<{
		past: IEvent[];
		live: IEvent[];
		upcoming: IEvent[];
	}>();
	return response.data;
}

export const getEvents = createAsyncThunk<any, {}>(
	"event/public/get",
	async (payload, { rejectWithValue, fulfillWithValue }) => {
		try {
			const response = await EventService.getEvents<{
				totalEvents: number;
				events: IEvent[];
			}>({ params: payload });
			return fulfillWithValue(response);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export async function getEventNoRedux(payload: any) {
	const response = await EventService.getEvents<{
		totalEvents: number;
		events: IEvent[];
	}>({ params: payload });
	return response.data;
}

export async function getOneEvent({
	eventId,
}: {
	eventId: string;
}): Promise<IEvent> {
	const response = await EventService.getOneEvent<{ event: IEvent }>({
		eventId,
	});
	return response.data.event;
}

export async function getEventStreamData(eventId: string): Promise<Pick<IApiVideoLiveStream, "liveStreamId" | "streamKey">> {
	const response = await EventService.getEventStreamData<{
		stream: Pick<IApiVideoLiveStream, "liveStreamId" | "streamKey" | "assets">;
	}>({ eventId });
	return response.data.stream;
}

// export async function userEventStreamData({
//   eventId,
// }: {
//   eventId: string;
// }): Promise<Pick<IApiVideoLiveStream, "liveStreamId" | "streamKey">> {
//   const response = await EventService.getUserEventStreamData<{
//     stream: Pick<IApiVideoLiveStream, "liveStreamId" | "streamKey" | "assets">;
//   }>({ eventId });
//   return response.data.stream;
// }

export async function updateEvent({
	eventId,
	updateEventDto,
}: {
	eventId: string;
	updateEventDto: UpdateEventDto;
}) {
	const response = await EventService.updateEvent({ eventId, updateEventDto });
	return { message: response.message };
}

export async function updateEventType({ eventId, status }: {
	eventId: string;
	status: EventStatusType;
}) {
	const response = await EventService.updateEventStatus({ eventId, status });
	return { message: response.message };
}

export async function updateEventStatus({ eventId, status }: {
	eventId: string;
	status: EventStatusType;
}) {
	const response = await EventService.updateEventStatus({ eventId, status });
	return { message: response.message };
}

export async function updateEventSchedules({ eventId, schedules }: {
	eventId: string;
	schedules: ISchedule[];
}) {
	const response = await EventService.updateEventSchedules({ eventId, schedules });
	return { message: response.message };
}
