import { all } from 'redux-saga/effects';
import { AuthSaga } from 'features/UserAuth';
import { VideoToGifSaga } from 'features/VideoToGif';

console.log(VideoToGifSaga);

export default function* rootSaga() {
  yield all([AuthSaga(), VideoToGifSaga()]);
}
