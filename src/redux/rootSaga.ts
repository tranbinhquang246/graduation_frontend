import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import addCartSaga from "./cart/saga";

export default function* rootSaga() {
  yield all([...authSaga(), ...addCartSaga()]);
}
