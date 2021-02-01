import { takeLatest, put, call } from 'redux-saga/effects';
import { Auth } from 'api';
import { message } from 'antd';
import { login, loginRequest, registerRequest } from './reducer';

export function* loginSaga({ payload: { successText, formData } }) {
  const { data } = yield call(Auth.login, formData);

  if (data?.authToken) {
    message.success(successText);
    yield put(login(data.authToken));
  }
}

export function* registerSaga({ payload: { successText, formData } }) {
  const { data } = yield call(Auth.register, formData);

  if (data?.authToken) {
    message.success(successText);
    yield put(login(data.authToken));
  }
}

export default function* watchAuthActions() {
  yield takeLatest(loginRequest.toString(), loginSaga);
  yield takeLatest(registerRequest.toString(), registerSaga);
}
