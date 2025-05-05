import {
  compose,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';

import userReducer from './user';
import categoriesReducer from './categories';
import cartReducer from './cart';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

const middlewares = compose(applyMiddleware(logger));

const store = createStore(rootReducer, undefined, middlewares);

export default store;
