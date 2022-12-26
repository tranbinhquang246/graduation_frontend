import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';

const rootSaga = function* rootSaga() {
  yield all([
	authSaga(),
  ]);
}

export default rootSaga;