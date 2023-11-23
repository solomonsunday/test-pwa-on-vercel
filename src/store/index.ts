import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/slices/auth/authSlice";
import userSlice from "../features/slices/user/userSlice";
import eventSlice from "@/features/slices/event/eventSlice";
import ticketSlice from "@/features/slices/ticket/ticketSlice";
import usersEvents from "@/features/slices/usersEvents/usersEventSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		events: eventSlice,
		usersEvents: usersEvents,
		users: userSlice,
		tickets: ticketSlice,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
