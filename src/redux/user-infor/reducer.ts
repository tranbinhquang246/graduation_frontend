import { createReducer } from "@reduxjs/toolkit";
import {
  setDeliveryAddress,
  setFavorite,
  setUserInfor,
  setUserInforSuccess,
} from "./action";

const initialState = {
  deliveryAddress: [],
  favorite: [],
  userInfor: { avatar: "", firstName: "", lastName: "", userId: "" },
  isOpenModalAddAddress: false,
  isSetUserInforSuccess: true,
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
    .addCase(setUserInforSuccess, (state, action) => {
      state.isSetUserInforSuccess = action.payload;
    });
});
