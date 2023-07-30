import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    currentUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { currentUser, logOut } = authSlice.actions;

export default authSlice.reducer;
