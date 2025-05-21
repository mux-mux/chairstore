import { ProductType } from '../../types/product';
import { CartAction } from '../../types/cart';

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

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
