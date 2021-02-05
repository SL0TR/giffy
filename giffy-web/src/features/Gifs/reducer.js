import { createSlice, createAction } from '@reduxjs/toolkit';

const initState = {
  myGifs: [],
  allGifs: [],
};

const GifSlice = createSlice({
  name: 'gif',
  initialState: initState,
  reducers: {
    getMyGifs(state, { payload }) {
      state.myGifs = payload;
    },
    getAllGifs(state, { payload }) {
      state.allGifs = payload;
    },
    updateGif(state, { payload: { sentFrom, index, update } }) {
      state[sentFrom][index] = {
        ...state[sentFrom][index],
        ...update,
      };
    },
    deleteGif(state, { payload }) {
      state.myGifs.splice(payload, 1);
    },
  },
});

export const createGifReq = createAction('gif/createGifReq');
export const getMyGifsReq = createAction('gif/getMyGifsReq');
export const getAllGifsReq = createAction('gif/getAllGifsReq');
export const updateGifReq = createAction('gif/updateGifReq');
export const deleteGifReq = createAction('gif/deleteGifReq');
export const getSingleGiffReq = createAction('gif/getSingleGiffReq');

export const { getAllGifs, getMyGifs, updateGif, deleteGif } = GifSlice.actions;

export default GifSlice;
