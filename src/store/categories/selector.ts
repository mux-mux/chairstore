import { StoreType } from '../../types/store';
import { createSelector } from 'reselect';

const selectCategoriesReducer = (state: StoreType) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);
