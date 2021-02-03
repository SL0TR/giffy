import { createSlice, createAction } from '@reduxjs/toolkit';

const initState = {
  token: null,
  user: {},
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    login(state, { payload }) {
      state.token = payload?.authToken;
      state.user = payload?.user;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const loginRequest = createAction('auth/login_request');
export const registerRequest = createAction('auth/register_request');
export const { login, logout } = AuthSlice.actions;

export default AuthSlice;
