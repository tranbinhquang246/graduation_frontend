import { createReducer } from "@reduxjs/toolkit";
import { setLoading } from "./actions";

const initialState = {
  loading: false,
};

export const loadingReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoading, (state, action) => {
    state.loading = action.payload;
  });
});
