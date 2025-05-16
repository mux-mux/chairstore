import { Action } from 'redux';

export type UserType = {
  uid: string;
  displayName: string;
  email: string;
};

export interface SignInWithEmailAction extends Action {
  payload: {
    email: string;
    password: string;
  };
}
