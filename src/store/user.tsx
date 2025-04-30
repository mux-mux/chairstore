import { UserAuth } from '../utils/firebase/firebase';

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (
  state: { currentUser: UserAuth | null },
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
      throw new Error(`Unknown type of ${type} in userReducer`);
  }
};

export default userReducer;
