import { configureStore, Middleware, UnknownAction } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import logger from 'redux-logger';
import { StoreType } from '../types/store';
import rootReducer from './rootReducer/rootReducer';

const middlewareList: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const sagaMidlleware = createSagaMiddleware();

middlewareList.push(sagaMidlleware);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewareList),
});

sagaMidlleware.run(rootSaga);

export default store;
export type AppDispatch = ThunkDispatch<StoreType, unknown, UnknownAction>;
