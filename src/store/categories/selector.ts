import { createSelector } from 'reselect';
import { CategoryType } from '../../types/category';
import { RootState } from '../../types/rootReducer';
import { ProductType } from '../../types/product';

const selectCategoriesReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): CategoryType[] => categoriesSlice.categories
);

export const selectProducts = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): ProductType[] =>
    categoriesSlice.categories.flatMap((category) => category.items)
);
