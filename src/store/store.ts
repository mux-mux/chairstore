import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import persistedReducer from './persistedReducer';
import logger from 'redux-logger';

const middlewareList = [];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const middlewares = compose(applyMiddleware(...middlewareList));

const store = createStore(persistedReducer, undefined, middlewares);

export default store;
