import { createAction } from "@reduxjs/toolkit";
import {
  SetDeliveryAddressPayload,
  SetFavoritePayload,
  SetUserInforPayload,
} from "./type";

export const setDeliveryAddress = createAction<SetDeliveryAddressPayload>(
  "SET_DELIVERY_ADDRESS"
);
export const setFavorite = createAction<SetFavoritePayload>("SET_FAVORITE");
export const setUserInfor = createAction<SetUserInforPayload>("SET_USER_INFOR");

export const setUserInforSuccess = createAction<boolean>(
  "SET_USER_INFOR_SUCCESS"
);
