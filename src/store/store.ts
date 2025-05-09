import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';
import persistedReducer from './persistedReducer';
import logger from 'redux-logger';
import { Middleware } from 'redux';

const middlewareList: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

middlewareList.push(thunk);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = composeEnhancer(applyMiddleware(...middlewareList));

const store = createStore(persistedReducer, undefined, middlewares);

export default store;
export type AppDispatch = typeof store.dispatch;
