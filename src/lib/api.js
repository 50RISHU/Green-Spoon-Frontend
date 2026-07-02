import axios from 'axios';
import { accessToken } from './stores/store';

// Create an Axios instance with base configuration
const api = axios.create({
  // Base URL for the API endpoints
  baseURL: 'https://green-spoon-backend.onrender.com/api', 
  // baseURL: 'http://127.0.0.1:5000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔐 Interceptor to inject Authorization header into every request
api.interceptors.request.use((config) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('access_token');

  // If a token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return the modified request configuration
  return config;
}, (error) => {
  // Handle request errors
  return Promise.reject(error);
});

export default api;
