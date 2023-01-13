import { call, put, takeEvery } from "redux-saga/effects";
import {
  addCartFailure,
  addCartRequest,
  addCartSuccess,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
  removeCartDetailRequest,
  removeCartDetailSuccess,
  removeCartDetailFailure,
} from "./actions";
import { addCart as addCartApi } from "./api";
import { updateQuantityCart as updateQuantityCartApi } from "./api";
import { removeCartDetail as removeCartDetailApi } from "./api";
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

function* updateQuantity(
  action: ReturnType<typeof updateQuantityRequest>
): IterableIterator<any> {
  try {
    const response = yield call(updateQuantityCartApi, action.payload);
    yield put(updateQuantitySuccess(response));
  } catch (error) {
    yield put(updateQuantityFailure(error));
  }
}

function* removeCartDetail(
  action: ReturnType<typeof removeCartDetailRequest>
): IterableIterator<any> {
  try {
    const response = yield call(removeCartDetailApi, action.payload);
    yield put(removeCartDetailSuccess(response));
  } catch (error) {
    yield put(removeCartDetailFailure(error));
  }
}

function* handleFailure(err: { payload: AxiosError }) {
  yield handleError(err.payload);
}

export default function addCartSaga() {
  return [
    takeEvery(addCartRequest, addCart),
    takeEvery(addCartFailure, handleFailure),
    takeEvery(updateQuantityRequest, updateQuantity),
    takeEvery(updateQuantityFailure, handleFailure),
    takeEvery(removeCartDetailRequest, removeCartDetail),
    takeEvery(removeCartDetailFailure, handleFailure),
  ];
}
