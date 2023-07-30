import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import favouriteReducer from "./features/favouriteSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    user: authReducer,
    favourite: favouriteReducer,
  },
});
