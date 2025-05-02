import { UserType } from '../types/user';
import { CategoryType } from '../types/category';

export type StoreType = {
  user: {
    currentUser: UserType;
  };
  categories: {
    categories: CategoryType[];
  };
};
