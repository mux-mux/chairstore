import {
  compose,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';

import userReducer from './user';
import categoriesReducer from './categories';

const rootReduer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

const middlewares = compose(applyMiddleware(logger));

const store = createStore(rootReduer, undefined, middlewares);

export default store;
