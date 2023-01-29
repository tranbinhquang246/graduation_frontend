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

export const setOpenModalAddAddress = createAction<boolean>(
  "SET_OPEN_MODAL_ADD_ADDRESS"
);
