import { takeLatest, call, put } from 'redux-saga/effects';
import { GifApi } from 'api';
import {
  getAllGifsReq,
  getMyGifsReq,
  getAllGifs,
  getMyGifs,
  updateGifReq,
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

export function* updateGifSaga({ payload: { reqData, id } }) {
  const { data } = yield call(GifApi.update, reqData, id);

  if (data?.success) {
    yield call(getMyGifsSaga);
    yield call(getAllGifsSaga);
  }
}

export default function* watchVideoToGifActions() {
  yield takeLatest(getMyGifsReq.toString(), getMyGifsSaga);
  yield takeLatest(getAllGifsReq.toString(), getAllGifsSaga);
  yield takeLatest(updateGifReq.toString(), updateGifSaga);
}
