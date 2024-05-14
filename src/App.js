import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatientProvider } from './context/PatientContext';
import usePatients from './hooks/usePatients';
import { routesConfig } from './routesConfig';
import { users as initialUsers } from './fakeData/Users';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';
import HomePage from './pages/HomePage';
import ForbiddenPage from './pages/ForbiddenPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRedirectRoute from './components/AuthRedirectRoute';

const App = () => {
  const { patients, setPatients, handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient } = usePatients();
  const [users, setUsers] = useState(initialUsers);

  const routes = routesConfig(patients, setPatients, users, setUsers, handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient);

  return (
    <BrowserRouter>
      <PatientProvider>
        <Routes>
          <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
          <Route path="/register" element={<AuthRedirectRoute element={<Registration />} />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
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