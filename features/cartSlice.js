import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
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
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;

      const existingItem = state.items.find((item) => item._id === itemId);
      console.log(existingItem);
      if (existingItem && existingItem.quantity > 1) {
        // If the item exists in the cart and quantity is more than 1, decrease the quantity
        existingItem.quantity -= 1;
      } else {
        // If the item does not exist or quantity is 1, remove it from the cart
        state.items = state.items.filter((item) => item._id !== itemId);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
    },
    clearFromCart: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
