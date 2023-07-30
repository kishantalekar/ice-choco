import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        // If the item already exists in the cart, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        newItem.quantity = 1;
        state.items.push(newItem);
      }
    },

    removeFromFavourite: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
    },
    clearFromFavourite: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToFavorite, removeFromFavourite, clearFromFavourite } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
