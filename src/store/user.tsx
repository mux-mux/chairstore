import { UserAuth } from '../utils/firebase/firebase';

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
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
    payload: UserAuth | null;
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
