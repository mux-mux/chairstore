import { UserType } from '../types/user';

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

export const setCurrentUser = (user: UserType | null) => {
  return {
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: user,
  };
};

const INITIAL_STATE = {
  currentUser: {
    uid: '',
    email: '',
    displayName: '',
  },
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
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
