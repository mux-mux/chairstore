import {
  compose,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';

import userReducer from './user';
import categoriesReducer from './categories';

import { UserAuth } from '../utils/firebase/firebase';
import { CategoryType } from '../data';

export type stateType = {
  user: {
    currentUser: UserAuth;
  };
  categories: {
    categories: CategoryType;
  };
};

const rootReduer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

const middlewares = compose(applyMiddleware(logger));

const store = createStore(rootReduer, undefined, middlewares);

export default store;
