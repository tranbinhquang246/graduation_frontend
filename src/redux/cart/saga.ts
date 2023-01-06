import { call, put, takeEvery } from "redux-saga/effects";
import { addCartFailure, addCartRequest, addCartSuccess } from "./actions";
import { addCart as addCartApi } from "./api";
import { handleError } from "../../service";
import { AxiosError } from "axios";

function* addCart(
  action: ReturnType<typeof addCartRequest>
): IterableIterator<any> {
  try {
    const response = yield call(addCartApi, action.payload);
    yield put(addCartSuccess(response));
  } catch (error) {
    yield put(addCartFailure(error));
  }
}

function* handleFailure(err: { payload: AxiosError }) {
  yield handleError(err.payload);
}

export default function addCartSaga() {
  return [
    takeEvery(addCartRequest, addCart),
    takeEvery(addCartFailure, handleFailure),
  ];
}
