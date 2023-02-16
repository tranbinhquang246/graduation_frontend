import { createReducer } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  setAuthentication,
  setDataUser,
} from "./actions";

const initialState = {
  dataUser: { userRole: "" },
  loading: false,
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDataUser, (state, action) => {
      state.dataUser = action.payload.dataUser;
    })
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
