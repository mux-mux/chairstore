import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/product';
import { CartType } from '../../types/cart';

const INITIAL_STATE: CartType = {
  isCartOpen: false,
  cartItems: [],
};

export const addCartItem = (
  cartItems: ProductType[],
  itemToAdd: ProductType
) => {
  const isItemInCart = cartItems.find(
    (cartItem: ProductType) => cartItem.id === itemToAdd.id
  );

  if (isItemInCart) {
    return cartItems.map((cartItem: ProductType) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity! + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};

export const removeCartItem = (
  cartItems: ProductType[],
  itemToRemove: ProductType
) => {
  const isItemInCart = cartItems.find(
    (cartItem: ProductType) => cartItem.id === itemToRemove.id
  );

  if (isItemInCart && isItemInCart.quantity === 1) {
    return cartItems.filter(
      (cartItem: ProductType) => cartItem.id !== itemToRemove.id
    );
  } else {
    return cartItems.map((cartItem: ProductType) =>
      cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity! - 1 }
        : cartItem
    );
  }
};

export const clearCartItem = (
  cartItems: ProductType[],
  itemToClear: ProductType
) =>
  cartItems.filter((cartItem: ProductType) => cartItem.id !== itemToClear.id);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
