import { createSelector } from 'reselect';
import { UserType } from '../../types/user';
import { RootState } from '../../types/rootReducer';

export const selectUserReducer = (state: RootState) => state.user;

export const selectUser = createSelector(
  [selectUserReducer],
  (userSlice): UserType | null => userSlice.currentUser
);
