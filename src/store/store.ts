import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
  UnknownAction,
  Middleware,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import persistedReducer from './persistedReducer';
import logger from 'redux-logger';
import { StoreType } from '../types/store';

const middlewareList: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const sagaMidlleware = createSagaMiddleware();

middlewareList.push(sagaMidlleware);

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

sagaMidlleware.run(rootSaga);

export default store;
export type AppDispatch = ThunkDispatch<StoreType, unknown, UnknownAction>;
