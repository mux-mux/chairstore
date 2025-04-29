import { createContext, useEffect, useReducer, ReactNode } from 'react';
import {
  UserAuth,
  onAuthStateChangedListener,
  createUserDocument,
} from '../utils/firebase/firebase';
import userReducer, { USER_ACTION_TYPES } from '../store/user';

type UserContextType = {
  currentUser: UserAuth | null;
  setCurrentUser: (user: UserAuth | null) => void;
};

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

const INITIAL_STATE = {
  currentUser: {
    uid: '',
    email: '',
    displayName: '',
  },
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: UserAuth | null) => {
    dispatch({
      type: USER_ACTION_TYPES.SET_CURRENT_USER,
      payload: user,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        const userAuth: UserAuth = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
        };
        createUserDocument(userAuth, {});
        setCurrentUser(userAuth);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
