import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRedirectRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/patients" />;
  }

  return element;
};

export default AuthRedirectRoute;