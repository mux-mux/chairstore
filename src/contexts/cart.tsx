import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { ProductType } from './products';

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ProductType[];
  addItemToCart: (itemToAdd: ProductType) => void;
  removeItemFromCart: (itemToRemove: ProductType) => void;
  getCartTotalCount: () => number;
};

const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  getCartTotalCount: () => 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const getCartTotalCount = () =>
    cartItems.reduce(
      (total: number, cartItem: ProductType) => total + cartItem.quantity!,
      0
    );

  const addItemToCart = (itemToAdd: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === itemToAdd.id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === itemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity! + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemToRemove: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === itemToRemove.id
    );

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === itemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity! - 1 }
            : cartItem
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        getCartTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
