import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories';
import { userSaga } from './user';

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSaga)]);
}
