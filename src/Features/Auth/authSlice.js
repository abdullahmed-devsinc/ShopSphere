import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      delete state.user;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthState = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (user) => user?.role === 'admin',
);
