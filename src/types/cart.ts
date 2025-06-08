import { ProductType } from './product';

export type CartType = {
  isCartOpen: boolean;
  cartItems: ProductType[];
};

export type CartItemProps = {
  cartItem: ProductType;
};
