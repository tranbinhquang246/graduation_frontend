import { createAction } from "@reduxjs/toolkit";
import {
  CardDetailIDPayload,
  CardIDPayload,
  CartPayload,
  UpdateQuantityPayload,
} from "./type";

export const setCartID = createAction<CardIDPayload>("SET_CARTID");
export const addCartRequest = createAction<CartPayload>("ADDCART_REQUEST");
export const addCartSuccess = createAction<any>("ADDCART_SUCCESS");
export const addCartFailure = createAction<any>("ADDCART_FAILURE");

export const updateQuantityRequest = createAction<UpdateQuantityPayload>(
  "UPDATEQUANTITY_REQUEST"
);
export const updateQuantitySuccess = createAction<any>(
  "UPDATEQUANTITY_SUCCESS"
);
export const updateQuantityFailure = createAction<any>(
  "UPDATEQUANTITY_FAILURE"
);

export const removeCartDetailRequest = createAction<CardDetailIDPayload>(
  "REMOVECARTDETAIL_REQUEST"
);
export const removeCartDetailSuccess = createAction<any>(
  "REMOVECARTDETAIL_SUCCESS"
);
export const removeCartDetailFailure = createAction<any>(
  "REMOVECARTDETAIL_FAILURE"
);
