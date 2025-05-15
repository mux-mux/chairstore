import { combineReducers } from 'redux';
import userReducer from '../user/reducer';
import categoryReducer from '../categories/reducer';
import cartReducer from '../cart';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
