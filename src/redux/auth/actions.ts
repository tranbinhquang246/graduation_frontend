import { createAction } from "@reduxjs/toolkit";
import { LoginPayload, SignupPayload } from "./type";

export const loginRequest = createAction<LoginPayload>("LOGIN_REQUEST");
export const loginSuccess = createAction<any>("LOGIN_SUCCESS");
export const loginFailure = createAction<any>("LOGIN_FAILURE");

export const signupRequest = createAction<SignupPayload>("SIGNUP_REQUEST");
export const signupSuccess = createAction<any>("SIGNUP_SUCCESS");
export const signupFailure = createAction<any>("SIGNUP_FAILURE");
