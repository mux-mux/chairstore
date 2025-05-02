import { createContext, useReducer, ReactNode } from 'react';

import cartReducer, { CART_ACTION_TYPES } from '../store/cart';

import { ProductType } from '../types/product';

type CartContextType = {
  isCartOpen: boolean;
  cartItems: ProductType[];
  cartTotalCount: number;
  cartTotalPrice: number;
  setIsCartOpen: (isOpen: boolean) => void;
  addItemToCart: (itemToAdd: ProductType) => void;
  removeItemFromCart: (itemToRemove: ProductType) => void;
  clearItemFromCart: (itemToClear: ProductType) => void;
};

const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  cartItems: [],
  cartTotalCount: 0,
  cartTotalPrice: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotalCount: 0,
  cartTotalPrice: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [{ isCartOpen, cartItems, cartTotalCount, cartTotalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems: ProductType[]) => {
    const newCartTotalCount = newCartItems.reduce(
      (total: number, cartItem: ProductType) => total + cartItem.quantity!,
      0
    );
    const newCartTotalPrice = newCartItems.reduce(
      (total: number, cartItem: ProductType) =>
        total + cartItem.quantity! * cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotalCount: newCartTotalCount,
        cartTotalPrice: newCartTotalPrice,
      },
    });
  };

  const setIsCartOpen = (isOpen: boolean) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
      payload: {
        isCartOpen: isOpen,
      },
    });
  };

  const addItemToCart = (itemToAdd: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem: ProductType) => cartItem.id === itemToAdd.id
    );

    if (isItemInCart) {
      updateCartItemsReducer(
        cartItems.map((cartItem: ProductType) =>
          cartItem.id === itemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity! + 1 }
            : cartItem
        )
      );
    } else {
      updateCartItemsReducer([...cartItems, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemToRemove: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem: ProductType) => cartItem.id === itemToRemove.id
    );

    if (isItemInCart && isItemInCart.quantity === 1) {
      updateCartItemsReducer(
        cartItems.filter(
          (cartItem: ProductType) => cartItem.id !== itemToRemove.id
        )
      );
    } else {
      updateCartItemsReducer(
        cartItems.map((cartItem: ProductType) =>
          cartItem.id === itemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity! - 1 }
            : cartItem
        )
      );
    }
  };

  const clearItemFromCart = (itemToClear: ProductType) => {
    updateCartItemsReducer(
      cartItems.filter(
        (cartItem: ProductType) => cartItem.id !== itemToClear.id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        cartItems,
        cartTotalCount,
        cartTotalPrice,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
