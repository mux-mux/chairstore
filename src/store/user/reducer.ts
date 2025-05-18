import { UserType } from '../../types/user';
import { USER_ACTION_TYPES } from './actionTypes';

const INITIAL_STATE = {
  currentUser: {
    uid: '',
    email: '',
    displayName: '',
  },
  isLoading: false,
  error: null,
};

const userReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: UserType | null;
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGNOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGNOUT_FAILED:
    case USER_ACTION_TYPES.SIGNIN_FAILED:
    case USER_ACTION_TYPES.SIGNUP_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default userReducer;
