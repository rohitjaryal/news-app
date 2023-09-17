import axios from 'axios';
import useLoaderStore from '../stores/loader.store.ts';

// declare module 'vue' {
//   interface ComponentCustomProperties {
//     $http: typeof axios;
//     $translate: (key: string) => string;
//   }
// }

// export default {
//   install: (app: App, options: AxiosOptions) => {
//     const axiosInstance = axios.create({
//       baseURL: options.baseUrl
//       // headers: {
//       //   Authorization: options.token ? `Bearer ${options.token}` : ''
//       // }
//     });
//
//     axiosInstance.defaults.params = {};
//     axiosInstance.defaults.params['apiKey'] = options.apiKey;
//
//     app.provide('axiosInstance', axiosInstance);
//   }
// };

const BASE_URL = 'https://newsapi.org';
const API_KEY = '099148be22804e849a0c6fe022b7cf5e';

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
fetchRequest.defaults.params['apiKey'] = API_KEY;
