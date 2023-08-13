import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: null,
  },
  reducers: {
    addLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { addLocation } = locationSlice.actions;

export default locationSlice.reducer;
