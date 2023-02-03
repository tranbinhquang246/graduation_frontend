import { createAction } from "@reduxjs/toolkit";
import { OrderPayload, SetOrderedPayload } from "./type";

export const addOrderRequest = createAction<OrderPayload>("ADD_ORDER_REQUEST");
export const addOrderSuccess = createAction<any>("ADD_ORDER_SUCCESS");
export const addOrderFailure = createAction<any>("ADD_ORDER_FAILURE");
export const resetOrderState = createAction("RESET_ORDER_STATE");
export const setOrdered = createAction<SetOrderedPayload>("SET_ORDERED");
