import { takeLatest, call, put } from 'redux-saga/effects';
import { GifApi } from 'api';
import {
  getAllGifsReq,
  getMyGifsReq,
  getAllGifs,
  getMyGifs,
  updateGifReq,
  deleteGifReq,
  getSingleGiffReq,
} from './reducer';

export function* getMyGifsSaga() {
  const { data } = yield call(GifApi.index);

  if (data?.data) {
    yield put(getMyGifs(data.data));
  }
}

export function* getAllGifsSaga() {
  const { data } = yield call(GifApi.getAll);

  if (data?.data) {
    yield put(getAllGifs(data.data));
  }
}

export function* getSingleGiffSaga({ payload: { setGif, id } }) {
  const { data } = yield call(GifApi.getSingle, id);

  if (data?.success && data?.gif) {
    setGif(data.gif);
  }
}

export function* updateGifSaga({ payload: { reqData, id, setGif } }) {
  const { data } = yield call(GifApi.update, reqData, id);

  if (data?.success) {
    yield call(getMyGifsSaga);
    yield call(getAllGifsSaga);
    if (setGif) {
      yield call(getSingleGiffSaga, { payload: { id, setGif } });
    }
  }
}

export function* deleteGifSaga({ payload }) {
  const { data } = yield call(GifApi.delete, payload);

  if (data?.success) {
    yield call(getMyGifsSaga);
    yield call(getAllGifsSaga);
  }
}

export default function* watchVideoToGifActions() {
  yield takeLatest(getMyGifsReq.toString(), getMyGifsSaga);
  yield takeLatest(getAllGifsReq.toString(), getAllGifsSaga);
  yield takeLatest(updateGifReq.toString(), updateGifSaga);
  yield takeLatest(deleteGifReq.toString(), deleteGifSaga);
  yield takeLatest(getSingleGiffReq.toString(), getSingleGiffSaga);
}
