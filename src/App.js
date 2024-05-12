import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin'
import Registration from './pages/Registration'
import TablePage from './components/TablePage'
import PatientDetails from './pages/Patients/PatientDetails'
import EditPatient from './pages/Patients/EditPatient';

import { patients as initialPatients } from './fakeData/Patients';

import PatientsList from './components/PatientList';
import AddPatient from './pages/Patients/AddPatient';

function App() {
  const [patients, setPatients] = useState(initialPatients);

  const updatePatient = (updatedPatient) => {
    setPatients(patients.map(p => p.patientId === updatedPatient.patientId ? updatedPatient : p));
  };

  const addPatient = (newPatient) => {
    const newPatientId = patients.length ? Math.max(...patients.map(p => p.patientId)) + 1 : 1;
    
    setPatients([...patients, { ...newPatient, patientId: newPatientId }]);
  };

  const deletePatient = (patientId) => {
    setPatients(patients.filter(p => p.patientId !== patientId));
  };
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/register" element={<Registration/>} />
          <Route path = "/admin-login" element={<AdminLogin/>} />
          <Route 
            path = "/patients"
            element={
            <TablePage 
              patients={patients} 
              titleName="Список пациентов" 
              buttonName="Добавить нового пациента" 
              buttonLink="/new-patient" 
              ListComponent={PatientsList}  
            />
            } 
          />
          <Route path = "/new-patient" element={<AddPatient addPatient={addPatient}/>} />
          {/*<Route 
            path = "/doctors"
            element={
            <TablePage 
              patients={doctors} 
              titleName="Список врачей" 
              buttonName="Добавить нового врача" 
              buttonLink="/new-doctor" 
              ListComponent={DoctorsList}  
            />
            } 
          /> */}
          <Route path = "/patients/:patientId" element={<PatientDetails patients={patients} deletePatient={deletePatient} />} />
          <Route path="/patients/:patientId/edit" element={<EditPatient patients={patients} updatePatient={updatePatient} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
