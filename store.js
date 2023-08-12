import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import favouriteReducer from "./features/favouriteSlice";
import locationReducer from "./features/locationSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: authReducer,
    favourite: favouriteReducer,
    location: locationReducer,
  },
});
