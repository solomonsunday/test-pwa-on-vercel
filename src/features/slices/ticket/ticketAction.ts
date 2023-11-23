import { TicketService } from "@/features/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTicketDto, ITicket } from "./ticketInterface";


export async function createTicket(createTicketDto: CreateTicketDto) {
	const response = await TicketService.createTicket(createTicketDto);
	return { message: response.message };
}

export const getTickets = createAsyncThunk<any, {}>(
	"ticket/admin/get",
	async (payload, { rejectWithValue, fulfillWithValue }) => {
		try {
			const response = await TicketService.getTickets<{
				totalTickets: number,
				tickets: ITicket[]
			}>({ params: payload });
			return fulfillWithValue(response);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export async function getTicketPaidFor(eventId: string): Promise<ITicket[]> {
	const response = await TicketService.getIsTicketPaidFor<{ tickets: ITicket[] }>(eventId);
	return response.data.tickets;
}