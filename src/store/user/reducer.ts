import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, UserState } from '../../types/user';

const INITIAL_STATE: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserType | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
