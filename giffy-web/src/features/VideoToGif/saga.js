import { takeLatest, call } from 'redux-saga/effects';
import { GifApi } from 'api';
import { message } from 'antd';
import { createGifReq } from 'features/Gifs';

export function* createGifSaga({ payload: { reqData, setUploadSuccess } }) {
  const { data } = yield call(GifApi.uploadImg, reqData);

  if (data?.url) {
    const res = yield call(GifApi.create, { url: data.url });

    if (res?.data?.gifId) {
      setUploadSuccess(true);
      message.success('success!');
    }
  }
}

export default function* watchVideoToGifActions() {
  yield takeLatest(createGifReq.toString(), createGifSaga);
}
