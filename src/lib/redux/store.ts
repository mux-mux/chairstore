import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from './slices/cartSlice';
import { userReducer } from './slices/userSlice';
import { categoriesReducer } from './slices/categoriesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      categories: categoriesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
