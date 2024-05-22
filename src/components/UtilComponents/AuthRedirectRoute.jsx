import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthRedirectRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.role === 'ADMIN') {
      return <Navigate to="/admin/patients" />;
    } else if (decoded.role === 'DOCTOR') {
      return <Navigate to="/patients" />;
    } else if (decoded.role === 'SUPER-ADMIN') {
      return <Navigate to="/super-admin/users" />;
    } else if (decoded.role === 'PATIENT') {
      return <Navigate to="/lichniy-kabinet" />;
    }
  }

  return element;
};

export default AuthRedirectRoute;