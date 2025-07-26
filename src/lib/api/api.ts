import axios from 'axios';
import {store} from '@lib/store/store';

const api = axios.create({
  // baseURL: 'http://27.254.145.186:3006/v1/app',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
