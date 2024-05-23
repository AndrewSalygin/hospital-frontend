import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Или где вы храните ваш токен
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role); // Предполагаем, что роль хранится в токене
    }
  }, []);

  const value = {
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};