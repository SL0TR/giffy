import { all } from 'redux-saga/effects';
import { AuthSaga } from 'features/UserAuth';
import { VideoToGifSaga } from 'features/VideoToGif';
import { GifSaga } from 'features/Gifs';

export default function* rootSaga() {
  yield all([AuthSaga(), VideoToGifSaga(), GifSaga()]);
}
