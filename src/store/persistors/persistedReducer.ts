import { Reducer } from 'redux';
import rootReducer, { RootState } from '../rootReducer/rootReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PersistConfig } from 'redux-persist';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducer as unknown as Reducer<RootState>
);

export default persistedReducer;
