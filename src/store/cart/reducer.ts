import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../types/product';
import { CartType } from '../../types/cart';

const INITIAL_STATE: CartType = {
  isCartOpen: false,
  cartItems: [],
};

export const addCartItem = (
  cartItems: ProductType[],
  itemToAdd: ProductType
): ProductType[] => {
  const isItemInCart = cartItems.find(
    (cartItem: ProductType) => cartItem.id === itemToAdd.id
  );

  if (isItemInCart) {
    return cartItems.map((cartItem: ProductType) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: (cartItem.quantity ?? 1) + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};

export const removeCartItem = (
  cartItems: ProductType[],
  itemToRemove: ProductType
): ProductType[] => {
  const isItemInCart = cartItems.find(
    (cartItem: ProductType) => cartItem.id === itemToRemove.id
  );

  if (isItemInCart?.quantity === 1) {
    return cartItems.filter(
      (cartItem: ProductType) => cartItem.id !== itemToRemove.id
    );
  } else {
    return cartItems.map((cartItem: ProductType) =>
      cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: (cartItem.quantity ?? 1) - 1 }
        : cartItem
    );
  }
};

export const clearCartItem = (
  cartItems: ProductType[],
  itemToClear: ProductType
): ProductType[] =>
  cartItems.filter((cartItem: ProductType) => cartItem.id !== itemToClear.id);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action: PayloadAction<ProductType>) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action: PayloadAction<ProductType>) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action: PayloadAction<ProductType>) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    clearAllItemsFromCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  clearAllItemsFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
