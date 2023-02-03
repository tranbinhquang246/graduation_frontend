import { call, put, takeEvery } from "redux-saga/effects";
import { addOrderFailure, addOrderRequest, addOrderSuccess } from "./actions";
import { addOrder as addOrderApi } from "./api";
import { handleError } from "../../service";
import { AxiosError } from "axios";

function* addOrder(
  action: ReturnType<typeof addOrderRequest>
): IterableIterator<any> {
  try {
    const response = yield call(addOrderApi, action.payload);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFailure(error));
  }
}
function* handleFailure(err: { payload: AxiosError }) {
  yield handleError(err.payload);
}

export default function addOrderSaga() {
  return [
    takeEvery(addOrderRequest, addOrder),
    takeEvery(addOrderFailure, handleFailure),
  ];
}
