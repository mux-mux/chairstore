import { UserType } from '../../types/user';
import { USER_ACTION_TYPES } from './actionTypes';

export const setCurrentUser = (user: UserType | null) => {
  return {
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: user,
  };
};

export const checkUserSession = () => {
  return {
    type: USER_ACTION_TYPES.CHECK_USER_SESSION,
  };
};

export const googleSignInStart = () => {
  return {
    type: USER_ACTION_TYPES.GOOGLE_SIGNIN_START,
  };
};

export const emailSignInStart = (email: string, password: string) => {
  return {
    type: USER_ACTION_TYPES.EMAIL_SIGNIN_START,
    payload: { email, password },
  };
};

export const signInSuccess = (user: UserType) => {
  return {
    type: USER_ACTION_TYPES.SIGNIN_SUCCESS,
    payload: user,
  };
};

export const signInFailed = (error: Error | unknown) => {
  return {
    type: USER_ACTION_TYPES.SIGNIN_FAILED,
    payload: error,
  };
};

export const signUpStart = (
  email: string,
  password: string,
  displayName: string
) => {
  return {
    type: USER_ACTION_TYPES.SIGNUP_START,
    payload: { email, password, displayName },
  };
};

export const signUpSuccess = (user: UserType, params: object) => {
  return {
    type: USER_ACTION_TYPES.SIGNUP_SUCCESS,
    payload: { user, params },
  };
};

export const signUpFailed = (error: Error | unknown) => {
  return {
    type: USER_ACTION_TYPES.SIGNUP_FAILED,
    payload: error,
  };
};

export const signOutStart = () => {
  return {
    type: USER_ACTION_TYPES.SIGNOUT_START,
  };
};

export const signOutSuccess = () => {
  return {
    type: USER_ACTION_TYPES.SIGNOUT_SUCCESS,
  };
};
export const signOutFailed = (error: Error | unknown) => {
  return {
    type: USER_ACTION_TYPES.SIGNOUT_FAILED,
    payload: error,
  };
};
