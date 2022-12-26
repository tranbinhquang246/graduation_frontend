import { createReducer } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from './actions';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const authReducer = createReducer(initialState, (builder)=>{

	builder.addCase(loginRequest, (state, action) => {
		 state.loading = true;
	})
		.addCase(loginSuccess, (state, action) => {
		 state.loading = false;
		})
		.addCase(loginFailure, (state, action) => {
		state.loading = false;
	})
});
