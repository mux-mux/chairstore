import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/reducer';
import { categoriesReducer } from './categories/reducer';
import cartReducer from './cart/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
