import { createReducer } from "@reduxjs/toolkit";
import {
  addCartFailure,
  addCartRequest,
  addCartSuccess,
  setCartID,
} from "./actions";

const initialState = {
  cartId: 0,
  addCardSuccess: false,
  quantity: 0,
  loading: false,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCartID, (state, action) => {
      state.cartId = action.payload.cardId;
    })
    .addCase(addCartRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(addCartSuccess, (state, action) => {
      state.loading = false;
      state.addCardSuccess = !state.addCardSuccess;
    })
    .addCase(addCartFailure, (state, action) => {
      state.loading = false;
    });
});
