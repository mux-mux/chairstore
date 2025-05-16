import { Action } from 'redux';

export type UserType = {
  uid: string;
  email: string;
  displayName: string;
};

export interface SignInWithEmailAction extends Action {
  payload: {
    email: string;
    password: string;
  };
}

export interface SignUpAction extends Action {
  payload: {
    email: string;
    password: string;
    displayName: string;
  };
}

export interface SignInAfterSignUpAction extends Action {
  payload: {
    user: UserType;
    params: object;
  };
}
