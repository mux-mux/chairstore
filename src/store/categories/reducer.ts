import { CategoryType } from '../../types/category';
import { CATEGORIES_ACTION_TYPES } from './actionTypes';

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

export default categoriesReducer;
