import { createReducer } from "@reduxjs/toolkit";
import { setAddEvaluationSuccess } from "./actions";

const initialState = {
  addEvaluation: false,
};

export const evaluationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAddEvaluationSuccess, (state, action) => {
    state.addEvaluation = !state.addEvaluation;
  });
});
