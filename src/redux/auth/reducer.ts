import { createReducer } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  setAuthentication,
} from "./actions";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isOpenModalDeleteAccount: false,
  isDeleteAccountSuccess: true,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    })
    .addCase(signupRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(signupSuccess, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(signupFailure, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    })
    .addCase(setAuthentication, (state, action) => {
      state.isAuthenticated = action.payload;
    });
});
