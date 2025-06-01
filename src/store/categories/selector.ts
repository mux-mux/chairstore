import { createSelector } from 'reselect';
import { CategoryType } from '../../types/category';
import { RootState } from '../../types/rootReducer';

const selectCategoriesReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): CategoryType[] => categoriesSlice.categories
);
