import { createSelector } from 'reselect';
import { CategoryType } from '../types/category';
import { StoreType } from '../types/store';
import { getCollectionsAndDocuments } from '../utils/firebase/firebase';
import { AppDispatch } from './store';

export const CATEGORIES_ACTION_TYPES = {
  FETCH_CATEGORIES_START: 'FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED',
};

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
export const fetchCategoriesFailed = (error: unknown) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    payload: error,
  };
};

export const fetchCategoriesAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesMap = await getCollectionsAndDocuments();
      dispatch(fetchCategoriesSuccess(categoriesMap));
    } catch (error) {
      console.error('Error fetching categories:', error);
      dispatch(fetchCategoriesFailed(error));
    }
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
  isLoading: false,
  error: null,
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
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

const selectCategoriesReducer = (state: StoreType) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export default categoriesReducer;
