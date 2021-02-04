import { http } from 'services';
import { gifUrl, gifUploadUrl, getAllgifUrl } from './endpoints';

export const GifApi = {
  index: () => http.get(gifUrl),
  getAll: () => http.get(getAllgifUrl),
  getSingle: id => http.get(`${gifUrl}/${id}`),
  uploadImg: data => http.post(gifUploadUrl, data),
  create: data => http.post(gifUrl, data),
  update: (data, id) => http.put(`${gifUrl}/${id}`, data),
  delete: id => http.delete(`${gifUrl}/${id}`),
};
