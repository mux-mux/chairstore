import { takeLatest, put, call, all } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from '../user/actionTypes';
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
} from '../user/actions';
import { DocumentSnapshot, DocumentData } from 'firebase/firestore';
import {
  getCurrentUser,
  createUserDocument,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';
import {
  UserType,
  SignInWithEmailAction,
  SignUpAction,
  SignInAfterSignUpAction,
} from '../../types/user';

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

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getUserSnapshot, user, {} as ParamsType);
  } catch (error: Error | unknown) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail(action: SignInWithEmailAction) {
  try {
    const { email, password } = action.payload;
    const { user } = yield call(
      signInUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getUserSnapshot, user, {});
  } catch (error: Error | unknown) {
    yield put(signInFailed(error));
  }
}

export function* signUp(action: SignUpAction) {
  try {
    const { email, password, displayName } = action.payload;
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error: Error | unknown) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp(action: SignInAfterSignUpAction) {
  const { user, params } = action.payload;
  yield* getUserSnapshot(user, params as ParamsType);
}

export function* isUserAuth(): Generator<unknown, void, UserType> {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getUserSnapshot, userAuth, {} as ParamsType);
  } catch (error: Error | unknown) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signInAfterSignUp);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
