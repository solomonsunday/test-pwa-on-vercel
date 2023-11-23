import { createAsyncThunk } from "@reduxjs/toolkit";

import { UsersEventsService } from "@/features/services";
import { IEvent } from "../event/eventInterface";

export const getAllUserEvents = createAsyncThunk<any, {}>(
  "event/ticket/ticketsandevent/user",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await UsersEventsService.UsersEvents<{
        totalEvents: number;
        tickets: IEvent[];
      }>({ params: payload });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
