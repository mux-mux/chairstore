import { ProductType } from './product';

export type CartType = {
  isCartOpen: boolean;
  cartItems: ProductType[];
};
