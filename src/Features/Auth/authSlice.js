import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state) { state.isAuthenticated = true }
    }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthState = state => state.auth.isAuthenticated;