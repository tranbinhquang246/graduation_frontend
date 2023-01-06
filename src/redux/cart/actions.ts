import { createAction } from "@reduxjs/toolkit";
import { CardIDPayload, CartPayload } from "./type";

export const setCartID = createAction<CardIDPayload>("SET_CARTID");
export const addCartRequest = createAction<CartPayload>("ADDCART_REQUEST");
export const addCartSuccess = createAction<any>("ADDCART_SUCCESS");
export const addCartFailure = createAction<any>("ADDCART_FAILURE");
