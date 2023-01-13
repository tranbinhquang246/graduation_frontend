import { createReducer } from "@reduxjs/toolkit";
import {
  addCartFailure,
  addCartRequest,
  addCartSuccess,
  removeCartDetailFailure,
  removeCartDetailRequest,
  removeCartDetailSuccess,
  setCartID,
  updateQuantityFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
} from "./actions";

const initialState = {
  cartId: 0,
  addCardSuccess: false,
  updateQuantity: false,
  removeCardSuccess: false,
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
    })
    .addCase(updateQuantityRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(updateQuantitySuccess, (state, action) => {
      state.loading = false;
      state.updateQuantity = !state.updateQuantity;
    })
    .addCase(updateQuantityFailure, (state, action) => {
      state.loading = false;
    })
    .addCase(removeCartDetailRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(removeCartDetailSuccess, (state, action) => {
      state.loading = false;
      state.removeCardSuccess = !state.removeCardSuccess;
    })
    .addCase(removeCartDetailFailure, (state, action) => {
      state.loading = false;
    });
});
