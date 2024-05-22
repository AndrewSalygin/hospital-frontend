import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatientProvider } from './context/PatientContext';
import usePatients from './hooks/usePatients';
import { routesConfig } from './routesConfig';
import { users as initialUsers } from './fakeData/Users';
import Layout from './components/UIComponents/Layout';
import NotFound from './pages/UtilPages/NotFound';
import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';
import HomePage from './pages/UtilPages/HomePage';
import ForbiddenPage from './pages/UtilPages/ForbiddenPage';
import ProtectedRoute from './components/UtilComponents/ProtectedRoute';
import AuthRedirectRoute from './components/UtilComponents/AuthRedirectRoute';
import AdminLogin from './pages/Authorization/AdminLogin';

const App = () => {
  const {
    patients, setPatients,
    handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient
  } = usePatients();
  
  const [users, setUsers] = useState(initialUsers);

  const routes = routesConfig({
    patients, setPatients,
    users, setUsers,
    handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient
  });

  return (
    <BrowserRouter>
      <PatientProvider>
        <Routes>
          {/* Куда пускаем пользователя без авторизации + настройки axios */}
          <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
          <Route path="/register" element={<AuthRedirectRoute element={<Registration />} />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} /> {/* Главная страница */}

            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<ProtectedRoute element={route.element} />} />
            ))}
            
            <Route path="*" element={<NotFound />} />
          </Route>
          
        </Routes>
      </PatientProvider>
    </BrowserRouter>
  );
};

export default App;