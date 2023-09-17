import axios from 'axios';
import useLoaderStore from '../stores/loader.store.ts';

const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchRequest = axios.create({
  baseURL: BASE_URL
});

fetchRequest.interceptors.request.use(
  (config) => {
    const loaderStore = useLoaderStore();

    loaderStore.isLoading = true;
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

fetchRequest.interceptors.response.use(
  (response) => {
    const loaderStore = useLoaderStore();
    loaderStore.isLoading = false;
    return response;
  },
  (error) => {
    const loaderStore = useLoaderStore();
    loaderStore.isLoading = false;
    console.error(error);
    return Promise.reject(error.message);
  }
);

fetchRequest.defaults.params = {};
fetchRequest.defaults.params = {
  apiKey: API_KEY,
  ...fetchRequest.defaults.params
};
