import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "./actions";
import { login as loginApi } from "./api";
import { signup as signupApi } from "./api";

function* loginSaga(
  action: ReturnType<typeof loginRequest>
): IterableIterator<any> {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(loginFailure(error));
  }
}

function* signupSaga(
  action: ReturnType<typeof signupRequest>
): IterableIterator<any> {
  try {
    const response = yield call(signupApi, action.payload);
    yield put(signupSuccess(response));
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function* handleLoginSuccess(response: any) {
  yield localStorage.setItem("jwt_token", response.payload.data.access_token);
}
function* handleSignupSuccess(response: any) {
  yield localStorage.setItem("jwt_token", response.payload.data.access_token);
}

export default function authSaga() {
  return [
    takeEvery(loginRequest, loginSaga),
    takeEvery(loginSuccess, handleLoginSuccess),
    takeEvery(signupRequest, signupSaga),
    takeEvery(signupSuccess, handleSignupSuccess),
  ];
}
