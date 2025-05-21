import { StoreType } from '../../types/store';
import { createSelector } from 'reselect';

export const selectUserReducer = (state: StoreType) => state.user;

export const selectUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);
