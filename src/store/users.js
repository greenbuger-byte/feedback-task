import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userRequest } from "../requests/userRequest";

export const loadAllUsersRequest = createAsyncThunk(
  "users/loadAllUsersRequest",
  async () => await userRequest.loadAllUsers()
);

export const createNewUserRequest = createAsyncThunk(
  "users/usersCreateNewUser",
  async (data) => await userRequest.createNewUser(data)
);

export const deleteUserRequest = createAsyncThunk(
  "users/deleteUserRequest",
  async (id) => await userRequest.deleteUser(id)
);

const slice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllUsersRequest.fulfilled, (state, action) => {
      const { payload } = action;
      const { users } = payload;
      state.users = users;
    });
    builder.addCase(loadAllUsersRequest.rejected, (state, action) => {
      const { error } = action;
      state.errors = error.message;
    });
    builder.addCase(createNewUserRequest.rejected, (state, action) => {
      const { error } = action;
      state.errors = error.message;
    });
    builder.addCase(createNewUserRequest.fulfilled, (state, action) => {
      const { payload } = action;
      state.users = [payload, ...state.users];
    });
    builder.addCase(deleteUserRequest.fulfilled, (state, action) => {
      const { payload } = action;
      const { id } = payload;
      state.users = state.users.filter((user) => user.id !== id);
    });
  },
});

export default slice.reducer;
