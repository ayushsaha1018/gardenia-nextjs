import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import cartReducer from "../slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    basket: basketReducer,
  },
});
