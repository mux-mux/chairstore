import { UserType } from '../types/user';
import { CategoryType } from '../types/category';
import { ProductType } from './product';

export type StoreType = {
  user: {
    currentUser: UserType;
  };
  categories: {
    categories: CategoryType[];
    isLoading: boolean;
    error: Error | null;
  };
  cart: {
    isCartOpen: boolean;
    cartItems: ProductType[];
  };
};
