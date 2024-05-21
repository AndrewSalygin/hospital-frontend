import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatientProvider } from './context/PatientContext';
import usePatients from './hooks/Patients/usePatients';
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

// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Alternatively, enable CORS for specific origins
// // app.use(cors({
// //   origin: 'http://localhost:3000'
// // }));

// // Your other routes and middleware
// app.put('/admin-patients/detach/:patientId', (req, res) => {
//   // Handle the request
//   res.send({ message: 'Patient detached successfully' });
// });

// app.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });

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