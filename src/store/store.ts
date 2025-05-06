import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import rootReducer, { RootState } from './reducer';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const middlewares = compose(applyMiddleware(logger));

const store = createStore(persistedReducer, undefined, middlewares);

export const persistor = persistStore(store);

export default store;
