import axios from 'axios';
import { BASE_URL } from '../constants';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default api;
