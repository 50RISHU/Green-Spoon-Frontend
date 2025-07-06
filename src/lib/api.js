import axios from 'axios';
import { accessToken } from './stores/store';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Your Flask base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔐 Interceptor to inject Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
