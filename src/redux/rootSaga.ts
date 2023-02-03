import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import addCartSaga from "./cart/saga";
import addOrderSaga from "./order/saga";

export default function* rootSaga() {
  yield all([...authSaga(), ...addCartSaga(), ...addOrderSaga()]);
}
