import { configureStore, Middleware } from '@reduxjs/toolkit';
// import persistedReducer from './persistedReducer';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const middlewareList: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewareList),
});

export default store;
