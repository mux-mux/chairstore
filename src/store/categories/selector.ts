import { StoreType } from '../../types/store';
import { createSelector } from 'reselect';
import { CategoryType } from '../../types/category';

const selectCategoriesReducer = (state: StoreType) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): CategoryType[] => categoriesSlice.categories
);
