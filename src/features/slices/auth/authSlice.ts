"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/index";
import { userRegister, userLogin, persistAuthentication, logOut } from "./authAction";
import { IBaseErrorObject, IBaseState } from "@/common/base.interface";
import { IAuthResponse } from "./authInterface";


// Define the initial state using that type
const initialState: IBaseState<IAuthResponse> = {
	loading: false,
	data: null,
	error: null,
	success: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signInToAccount: (
			state,
			action: PayloadAction<{ data: IAuthResponse; }>
		) => {
			state.data = { ...action?.payload?.data };
		},
		signOutFromAccount: (state) => {
			state.data = null;
		},
		registerAccount: (
			state,
			action: PayloadAction<{ data: IAuthResponse; }>
		) => {
			state.data = { ...action.payload.data };
		},
		persistUserAuthentication: (
			state,
			action: PayloadAction<{ data: IAuthResponse; }>
		) => {
			state.data = { ...action.payload.data };
		},
	},
	extraReducers: (builder) => {
		// register user reducer...
		builder.addCase(userRegister.pending, (state, action) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(userRegister.fulfilled, (
			state,
			action: PayloadAction<{ data: IAuthResponse; }>
		) => {
			state.success = true;
			state.loading = false;
			state.error = null;
			state.data = { ...action.payload?.data };
		});
		builder.addCase(userRegister.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as IBaseErrorObject || {
				statusCode: 500,
				message: "An error occurred!"
			};
		});

		// login user reducer...
		builder.addCase(userLogin.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(userLogin.fulfilled, (
			state,
			action: PayloadAction<{ data: IAuthResponse; }>
		) => {
			state.success = true;
			state.loading = false;
			state.error = null;
			state.data = { ...action.payload?.data };
		});
		builder.addCase(userLogin.rejected, (state, action) => {
			state.success = false;
			state.loading = false;
			state.error = action.payload as IBaseErrorObject || {
				statusCode: 500,
				message: "An error occurred!"
			};
		});

		// logOut user reducer...
		builder.addCase(logOut.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(logOut.fulfilled, (state) => {
			state.success = true;
			state.loading = false;
			state.error = null;
			state.data = null;
		});
		builder.addCase(logOut.rejected, (state, action) => {
			state.success = false;
			state.loading = false;
			state.error = action.payload as IBaseErrorObject || {
				statusCode: 500,
				message: "An error occurred!"
			};
		});

		// persist user auth from localstorage...
		builder.addCase(persistAuthentication.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(persistAuthentication.fulfilled, (
			state,
			action: PayloadAction<{ data: IAuthResponse; }>
		) => {
			state.success = true;
			state.loading = false;
			state.error = null;
			state.data = { ...action.payload?.data };
		});
		builder.addCase(persistAuthentication.rejected, (state, action) => {
			state.success = false;
			state.loading = false;
			state.error = action.payload as IBaseErrorObject || {
				statusCode: 500,
				message: "An error occurred!"
			};
		});
	},
});

export const { signInToAccount, signOutFromAccount, registerAccount, persistUserAuthentication } =
	authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.data?.user;
export default authSlice.reducer;
