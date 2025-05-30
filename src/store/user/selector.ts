import { StoreType } from '../../types/store';
import { createSelector } from 'reselect';
import { UserType } from '../../types/user';

export const selectUserReducer = (state: StoreType) => state.user;

export const selectUser = createSelector(
  [selectUserReducer],
  (userSlice): UserType | null => userSlice.currentUser
);
