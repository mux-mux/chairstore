import { configureStore, Middleware } from '@reduxjs/toolkit';
import persistedReducer from './persistors/persistedReducer';
import logger from 'redux-logger';
import * as reduxPersistConstants from 'redux-persist/es/constants';

const middlewareList: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: Object.values(reduxPersistConstants).map((action) =>
          action.toString()
        ),
      },
    }).concat(middlewareList),
});

export default store;
