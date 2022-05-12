import axios from 'axios';
import { message } from 'antd';
import { store } from 'store';
import { logout } from 'features/UserAuth';

const http = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(config => {
  if (config?.url.includes('cloudinary')) {
    return config;
  }
  const state = store?.getState();

  if (state?.Auth?.token) {
    const token = `Bearer ${state.Auth.token}`;
    config.headers.Authorization = token;
  }

  return config;
});

http.interceptors.response.use(null, error => {
  if (error?.response?.status === 401) {
    message.error(error.response.data?.message || 'Unauthorized');
    store.dispatch(logout());
    return { error };
  }

  if (error?.response?.data?.message) {
    message.error(error.response.data.message);
    return { error };
  }

  message.error(error?.message || 'Something went wrong!');

  return { error };
});

export default http;
