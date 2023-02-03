import { createReducer } from "@reduxjs/toolkit";
import {
  addOrderFailure,
  addOrderRequest,
  addOrderSuccess,
  resetOrderState,
  setOrdered,
} from "./actions";

const initialState = {
  orderDetail: [],
  addOrderSuccess: false,
};
export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase(addOrderRequest, (state) => {
    state.orderDetail = [];
    state.addOrderSuccess = false;
  });
  builder.addCase(addOrderSuccess, (state, action) => {
    state.orderDetail = action.payload;
    state.addOrderSuccess = true;
  });
  builder.addCase(addOrderFailure, (state) => {
    state.orderDetail = [];
    state.addOrderSuccess = false;
  });
  builder.addCase(resetOrderState, (state) => {
    state.addOrderSuccess = false;
  });
  builder.addCase(setOrdered, (state, action) => {
    state.orderDetail = action.payload.orderedData;
  });
});
