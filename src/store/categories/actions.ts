import { CategoryType } from '../../types/category';
import { CATEGORIES_ACTION_TYPES } from './actionTypes';

export const fetchCategoriesStart = () => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
  };
};
export const fetchCategoriesSuccess = (categories: CategoryType[] | null) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};
export const fetchCategoriesFailed = (error: Error | unknown) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    payload: error,
  };
};
