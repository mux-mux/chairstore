import {
  compose,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';

import userReducer from './user';

import { UserAuth } from '../utils/firebase/firebase';

export type stateType = {
  user: {
    currentUser: UserAuth;
  };
};

const rootReduer = combineReducers({
  user: userReducer,
});

const middlewares = compose(applyMiddleware(logger));

const store = createStore(rootReduer, undefined, middlewares);

export default store;
