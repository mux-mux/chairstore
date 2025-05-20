import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { StoreType } from '../types/store';

const INITIAL_STATE = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

const selectCategoriesReducer = (state: StoreType) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
