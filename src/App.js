import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatientProvider } from './context/PatientContext';
import { DoctorProvider } from './context/DoctorContext';
import { routesConfig } from './routesConfig';
import Layout from './components/UIComponents/Layout';
import NotFound from './pages/UtilPages/NotFound';
import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';
import HomePage from './pages/UtilPages/HomePage';
import ForbiddenPage from './pages/UtilPages/ForbiddenPage';
import AuthRedirectRoute from './components/UtilComponents/AuthRedirectRoute';
import AdminLogin from './pages/Authorization/AdminLogin';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const routes = routesConfig();

  return (
    <BrowserRouter>
    <AuthProvider>
      <DoctorProvider>
        <PatientProvider>
          <Routes>
            <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
            <Route path="/register" element={<AuthRedirectRoute element={<Registration />} />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />

              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PatientProvider>
      </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;