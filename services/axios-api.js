import axios from 'axios';
import { getLocalStorageItem } from '../utils/helpers';

const URL = 'https://strapi.cleverland.by/api/';

export const axiosApi = axios.create({
  baseURL: URL,
  headers: {},
});

axiosApi.interceptors.request.use(
  (request) => {
    const config = request;

    if (!config.url.includes('/auth/local') && getLocalStorageItem('jwtToken')) {
      config.headers.Authorization = `Bearer ${getLocalStorageItem('jwtToken')}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);
