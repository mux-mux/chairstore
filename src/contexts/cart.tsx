import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { ProductType } from './products';

const getCartItem = (cartItems: ProductType[], itemToAdd: ProductType) => {
  const itemInCart = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

  if (itemInCart)
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
        : cartItem
    );

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ProductType[];
  addItemToCart: (itemToAdd: ProductType) => void;
};

const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const addItemToCart = (itemToAdd: ProductType) => {
    setCartItems(getCartItem(cartItems, itemToAdd));
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
