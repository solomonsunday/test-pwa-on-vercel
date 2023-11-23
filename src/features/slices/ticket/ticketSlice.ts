import { IBaseErrorObject, IBaseState } from "@/common/base.interface";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTickets } from "./ticketAction";
import { ITicket } from "./ticketInterface";

const initialState: IBaseState<{
	totalTickets: number;
	tickets: ITicket[];
}> = {
	data: null,
	error: null,
	success: false,
	loading: false,
};


export const ticketSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		tickets: (
			state,
			action: PayloadAction<{
				totalTickets: number;
				tickets: ITicket[];
			}>
		) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload || { totalTickets: 0, tickets: [] };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTickets.pending, (state) => {
			state.loading = true;
			state.error = null;
		});

		builder.addCase(getTickets.rejected, (state, action) => {
			state.loading = false;
			state.error = (action.payload as IBaseErrorObject) || {
				statusCode: 500,
				message: "An error occurred!",
			};
		});

		builder.addCase(getTickets.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.success = true;
			state.data = action.payload.data;
		});
	},
});

export const { tickets } = ticketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTickets = (state: RootState) => state.tickets.data;
export default ticketSlice.reducer;
