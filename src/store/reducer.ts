import { combineReducers } from 'redux';
import { userReducer } from './user';
import categoryReducer from './categories';
import cartReducer from './cart';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
