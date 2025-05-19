import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: {
    uid: '',
    email: '',
    displayName: '',
  },
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setEmptyUser(state) {
      state.currentUser = { uid: '', email: '', displayName: '' };
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setEmptyUser, setError } = userSlice.actions;
export const userReducer = userSlice.reducer;
