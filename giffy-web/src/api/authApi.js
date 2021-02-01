import { http } from 'services';
import { loginUrl, testApi, registerUrl } from './endpoints';

export const Auth = {
  login: data => http.post(loginUrl, data),
  register: data => http.post(registerUrl, data),
  test: () => http.get(testApi),
};
