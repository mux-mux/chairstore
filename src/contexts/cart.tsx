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
  getCartTotalCount: () => number;
};

const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  getCartTotalCount: () => 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const getCartTotalCount = () =>
    cartItems.reduce(
      (total: number, cartItem: ProductType) =>
        total + (cartItem.quantity || 0),
      0
    );

  const addItemToCart = (itemToAdd: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === itemToAdd.id
    );

    if (isItemInCart)
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === itemToAdd.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        )
      );

    setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }]);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        getCartTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
