import axios from 'axios';
import { accessToken } from './stores/store';

const api = axios.create({
  // baseURL: 'https://green-spoon-backend.onrender.com/api', 
  baseURL: 'http://127.0.0.1:5000/api', 
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
