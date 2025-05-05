import { CART_ACTION_TYPES } from '../store/cart';
import { ProductType } from './product';

type SetCartItemsAction = {
  type: typeof CART_ACTION_TYPES.SET_CART_ITEMS;
  payload: {
    cartItems: ProductType[];
    cartTotalCount: number;
    cartTotalPrice: number;
  };
};

type SetIsCartItemsAction = {
  type: typeof CART_ACTION_TYPES.SET_IS_CART_OPEN;
  payload: {
    isCartOpen: boolean;
  };
};

export type CartAction = SetCartItemsAction | SetIsCartItemsAction;
