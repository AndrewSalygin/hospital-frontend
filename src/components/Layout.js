import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CustomNavbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showNavbar && <CustomNavbar />}
      <Outlet />
    </>
  );
};

export default Layout;