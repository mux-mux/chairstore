import { ProductType } from '../types/product';

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

type cartReducerType = {
  isCartOpen: boolean;
  cartItems: ProductType[];
  cartTotalCount: number;
  cartTotalPrice: number;
};

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

type CartAction = SetCartItemsAction | SetIsCartItemsAction;

const cartReducer = (state: cartReducerType, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, ...payload };
    default:
      throw new Error(`Unknow type of ${type} in cartReducer`);
  }
};

export default cartReducer;
