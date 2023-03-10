import { createAction } from "@reduxjs/toolkit";
import { DataUserPayload, LoginPayload, SignupPayload } from "./type";

export const loginRequest = createAction<LoginPayload>("LOGIN_REQUEST");
export const loginSuccess = createAction<any>("LOGIN_SUCCESS");
export const loginFailure = createAction<any>("LOGIN_FAILURE");

export const signupRequest = createAction<SignupPayload>("SIGNUP_REQUEST");
export const signupSuccess = createAction<any>("SIGNUP_SUCCESS");
export const signupFailure = createAction<any>("SIGNUP_FAILURE");

export const setAuthentication = createAction<boolean>("SET_AUTHENTICATION");

export const setUserRole = createAction<DataUserPayload>("SET_USER_ROLE");

export const deleteAccountRequest = createAction("DELETE_ACCOUNT_REQUEST");
export const deleteAccountSuccess = createAction("DELETE_ACCOUNT_SUCCESS");
export const deleteAccountFailure = createAction("DELETE_ACCOUNT_FAILURE");
