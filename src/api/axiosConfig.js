import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для проверки истечения срока действия токена
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // текущее время в секундах
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
};

instance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        token = null;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const currentPath = window.location.pathname;

      // Исключения для страниц логина, регистрации, корневого пути и forbidden
      const unprotectedPaths = ['/', '/login', '/register', '/forbidden'];

      if (unprotectedPaths.includes(currentPath)) {
        return Promise.reject(error);
      }

      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        window.location.href = '/forbidden';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;