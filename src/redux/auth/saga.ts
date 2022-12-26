import { call, put, takeEvery } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./actions";
import { login as loginApi } from "./api";


function* loginSaga(action: ReturnType<typeof loginRequest>): IterableIterator<any> {
	try {
	  console.log(action);
	//   const response = yield call(loginApi, action.payload);
	  console.log('adhsdjks');
    yield put(loginSuccess("response"));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export default function authSaga() {
	return [
		takeEvery(loginRequest, loginSaga),
	]
}
