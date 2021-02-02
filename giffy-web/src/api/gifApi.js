import { http } from 'services';
import { gifUrl, gifUploadUrl } from './endpoints';

export const GifApi = {
  index: () => http.post(gifUrl),
  uploadImg: data => http.post(gifUploadUrl, data),
  create: data => http.post(gifUrl, data),
  update: data => http.post(gifUrl, data),
};
