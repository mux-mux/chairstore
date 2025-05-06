import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
  Reducer,
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

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducer as unknown as Reducer<RootState>
);
const middlewares = compose(applyMiddleware(logger));

const store = createStore(persistedReducer, undefined, middlewares);

export const persistor = persistStore(store);

export default store;
