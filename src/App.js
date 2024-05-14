import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatientProvider } from './context/PatientContext';
import usePatients from './hooks/usePatients';
import { routesConfig } from './routesConfig';
import { users as initialUsers } from './fakeData/Users';

function App() {
  const { patients, setPatients, handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient } = usePatients();
  const [users, setUsers] = useState(initialUsers);

  const routes = routesConfig(patients, setPatients, users, setUsers, handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient);

  return (
    <BrowserRouter>
      <PatientProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </PatientProvider>
    </BrowserRouter>
  );
}

export default App;