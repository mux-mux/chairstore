import { createSelector } from 'reselect';
import { CartAction } from '../types/cart';
import { ProductType } from '../types/product';
import { StoreType } from '../types/store';

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

const selectCartReducer = (state: StoreType) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: ProductType) => total + cartItem.quantity!,
    0
  )
);

export const selectCartPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: ProductType) =>
      total + cartItem.quantity! * cartItem.price,
    0
  )
);

export const setIsCartOpen = (isOpen: boolean) => {
  return {
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: isOpen,
  };
};

export const addItemToCart = (
  cartItems: ProductType[],
  itemToAdd: ProductType
) => {
  const isItemInCart = cartItems.find(
    (cartItem: ProductType) => cartItem.id === itemToAdd.id
  );

  if (isItemInCart) {
    return {
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: cartItems.map((cartItem: ProductType) =>
        cartItem.id === itemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity! + 1 }
          : cartItem
      ),
    };
  } else {
    return {
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: [...cartItems, { ...itemToAdd, quantity: 1 }],
    };
  }
};

export const removeItemFromCart = (
  cartItems: ProductType[],
  itemToRemove: ProductType
) => {
  const isItemInCart = cartItems.find(
    (cartItem: ProductType) => cartItem.id === itemToRemove.id
  );

  if (isItemInCart && isItemInCart.quantity === 1) {
    return {
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: cartItems.filter(
        (cartItem: ProductType) => cartItem.id !== itemToRemove.id
      ),
    };
  } else {
    return {
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: cartItems.map((cartItem: ProductType) =>
        cartItem.id === itemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity! - 1 }
          : cartItem
      ),
    };
  }
};

export const clearItemFromCart = (
  cartItems: ProductType[],
  itemToClear: ProductType
) => {
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: cartItems.filter(
      (cartItem: ProductType) => cartItem.id !== itemToClear.id
    ),
  };
};

const cartReducer = (state = INITIAL_STATE, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      return state;
  }
};

export default cartReducer;
