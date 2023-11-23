import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/index";
import { IUser } from "./userInterface";
import { getAllUsers } from "./userAction";
import { IBaseErrorObject, IBaseState } from "@/common/base.interface";

// Define the initial state using that type

const initialState: IBaseState<{ totalUsers: number; users: IUser[] }> = {
  data: null,
  error: null,
  success: false,
  loading: false,
};


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    users: (
      state,
      action: PayloadAction<{
        totalUsers: number;
        users: IUser[];
      }>
    ) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload || { totalUsers: 0, users: [] };
    },
  },
  extraReducers: (builder) => {
    // userDetails reducer...
    // builder.addCase(getUserProfileInfo.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.success = true;
    //   state.data = action.payload;
    // }),
    //   builder.addCase(getUserProfileInfo.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   }),
    //   builder.addCase(getUserProfileInfo.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error =
    //       action.error.message ?? "An error occured, pls try again later!";
    //   });

    //get all users for admin
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as IBaseErrorObject) || {
        statusCode: 500,
        message: "An error occurred!",
      };
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.data = action.payload as any;
      console.log(action, "action");
    });
  },
});

export const { users } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users.data;
export default userSlice.reducer;
