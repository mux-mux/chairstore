import { takeLatest, put, call, all } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from '../user/actionTypes';
import { signInSuccess, signInFailed } from '../user/actions';
import { DocumentSnapshot, DocumentData } from 'firebase/firestore';
import {
  getCurrentUser,
  createUserDocument,
} from '../../utils/firebase/firebase';
import { UserType } from '../../types/user';

export type ParamsType = Record<string, string | number | boolean | null>;

export function* getUserSnapshot(
  userAuth: UserType,
  params: ParamsType
): Generator<unknown, void, DocumentSnapshot<DocumentData>> {
  try {
    const userSnapshot: DocumentSnapshot<DocumentData> = yield call(
      createUserDocument,
      userAuth,
      params
    );
    if (userSnapshot) {
      yield put(
        signInSuccess({
          uid: userSnapshot.id,
          displayName: '',
          email: '',
          ...userSnapshot.data(),
        })
      );
    }
  } catch (error: Error | unknown) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuth(): Generator<unknown, void, UserType> {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getUserSnapshot, userAuth, {});
  } catch (error: Error | unknown) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth);
}

export function* userSaga() {
  yield all([call(onCheckUserSession)]);
}
