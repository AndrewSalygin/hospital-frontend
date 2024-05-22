import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Функция для получения информации о пользователе из токена
const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const ProtectedRouteWithRole = ({ element, allowedRoles }) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" />;
  }

  return element;
};

export default ProtectedRouteWithRole;