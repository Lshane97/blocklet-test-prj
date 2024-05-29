import message from '@/components/message';
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data?.code !== 0) {
      if (response.data?.message) {
        message.error({ content: '请求错误 ' + response.data.message });
      }
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
