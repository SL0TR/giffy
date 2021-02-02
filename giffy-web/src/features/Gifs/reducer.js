import { createSlice, createAction } from '@reduxjs/toolkit';

const initState = {
  list: [],
};

const GifSlice = createSlice({
  name: 'gif',
  initialState: initState,
  reducers: {
    login(state, { payload }) {
      state.token = payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const createGifReq = createAction('gif/createGifReq');
export const { login, logout } = GifSlice.actions;

export default GifSlice;
