import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { categoriesReducer } from './categories';
import cartReducer from './cart';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
