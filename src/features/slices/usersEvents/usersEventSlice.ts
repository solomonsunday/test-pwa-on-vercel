import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBaseErrorObject, IBaseState } from "@/common/base.interface";
import { getAllUserEvents } from "./usersEventAction";
import { IEvent } from "../event/eventInterface";

const initialState: IBaseState<{ totalEvents: number; tickets: IEvent[] }> = {
  data: null,
  error: null,
  success: false,
  loading: false,
};

export const usersEventSlice = createSlice({
  name: "usersEvents",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getAllUserEvents: (
      state,
      action: PayloadAction<{
        totalEvents: number;
        tickets: IEvent[];
      }>
    ) => {
      state.data = action.payload || { totalEvents: 0, tickets: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUserEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as IBaseErrorObject) || {
        statusCode: 500,
        message: "An error occurred!",
      };
    });
    builder.addCase(getAllUserEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.data = action.payload.data;
    });
  },
});

export const {} = usersEventSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectEvent = (state: RootState) => state.usersEvents.data;
export default usersEventSlice.reducer;
