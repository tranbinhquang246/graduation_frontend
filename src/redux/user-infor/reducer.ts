import { createReducer } from "@reduxjs/toolkit";
import {
  setDeliveryAddress,
  setFavorite,
  setOpenModalAddAddress,
  setUserInfor,
} from "./action";

const initialState = {
  deliveryAddress: [],
  favorite: [],
  userInfor: { avatar: "", firstName: "", lastName: "", userId: "" },
  isOpenModalAddAddress: false,
};
export const userInforReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDeliveryAddress, (state, action) => {
      state.deliveryAddress = action.payload.deliveryAddress;
    })
    .addCase(setFavorite, (state, action) => {
      state.favorite = action.payload.favorite;
    })
    .addCase(setUserInfor, (state, action) => {
      state.userInfor = action.payload.userInfor;
    })
    .addCase(setOpenModalAddAddress, (state, action) => {
      state.isOpenModalAddAddress = action.payload;
    });
});
