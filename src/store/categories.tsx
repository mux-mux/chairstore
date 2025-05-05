import { createSelector } from 'reselect';
import { CategoryType } from '../types/category';
import { StoreType } from '../types/store';

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
};

export const setCategories = (categories: CategoryType[] | null) => {
  return {
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories,
  };
};

const INITIAL_STATE = {
  categories: {
    id: 0,
    title: '',
    path: '',
    imageSrc: '',
    items: [],
  },
};

const categoriesReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: CategoryType | null;
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };

    default:
      return state;
  }
};

const selectCategoriesReducer = (state: StoreType) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export default categoriesReducer;
