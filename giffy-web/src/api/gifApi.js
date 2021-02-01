import { http } from 'services';
import { gifUrl } from './endpoints';

export const GifApi = {
  index: () => http.post(gifUrl),
  create: data => http.post(gifUrl, data),
  update: data => http.post(gifUrl, data),
};
