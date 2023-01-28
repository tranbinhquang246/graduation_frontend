import { createReducer } from "@reduxjs/toolkit";
import {
  setDeliveryAddress,
  setOpenModalAddAddress,
  setUserInfor,
} from "./action";

const initialState = {
  deliveryAddress: [],
  userInfor: { avatar: "", firstName: "", lastName: "", userId: "" },
  isOpenModalAddAddress: false,
};
export const userInforReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDeliveryAddress, (state, action) => {
      state.deliveryAddress = action.payload.deliveryAddress;
    })
    .addCase(setUserInfor, (state, action) => {
      state.userInfor = action.payload.userInfor;
    })
    .addCase(setOpenModalAddAddress, (state, action) => {
      state.isOpenModalAddAddress = action.payload;
    });
});
