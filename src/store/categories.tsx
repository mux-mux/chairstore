import { ProductType } from '../contexts/categories';

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
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
    payload: ProductType | null;
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

export default categoriesReducer;
