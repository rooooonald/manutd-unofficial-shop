import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import checkoutFormReducer from "./checkout-form-slice";

export const store = configureStore({
  reducer: { cart: cartReducer, checkoutForm: checkoutFormReducer },
});
