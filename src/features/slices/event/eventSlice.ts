import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBaseErrorObject, IBaseState } from "@/common/base.interface";
import { IEvent } from "./eventInterface";
import { getEvents } from "./eventAction";

const initialState: IBaseState<{ totalEvents: number; events: IEvent[]; }> = {
	data: null,
	error: null,
	success: false,
	loading: false,
};

export const eventSlice = createSlice({
	name: "events",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		getAllEvents: (
			state,
			action: PayloadAction<{
				totalEvents: number;
				events: IEvent[];
			}>
		) => {
			state.data = action.payload || { totalEvents: 0, events: [] };
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getEvents.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(getEvents.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as IBaseErrorObject || {
				statusCode: 500,
				message: "An error occurred!"
			};
		});
		builder.addCase(getEvents.fulfilled, (
			state,
			action
		) => {
			state.loading = false;
			state.error = null;
			state.success = true;
			state.data = action.payload.data;
		});

	},
});

export const { } = eventSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectEvent = (state: RootState) => state.events.data;
export default eventSlice.reducer;
