import { createAction } from '@reduxjs/toolkit';
import { LoginPayload } from './type';

export const loginRequest = createAction<LoginPayload>('LOGIN_REQUEST');
export const loginSuccess = createAction<any>('LOGIN_SUCCESS');
export const loginFailure = createAction<any>('LOGIN_FAILURE');
