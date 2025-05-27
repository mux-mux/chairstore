import { ProductType } from './product';

export type CategoryType = {
  id: number;
  title: string;
  path: string;
  imageSrc: string;
  items: ProductType[];
};

export type CategoriesState = {
  categories: CategoryType[];
};