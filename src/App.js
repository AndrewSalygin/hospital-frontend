import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Authorization/Login';
import AdminLogin from './pages/Authorization/AdminLogin'
import Registration from './pages/Authorization/Registration'
import TablePage from './components/TablePage'
import PatientDetails from './pages/Patients/PatientDetails'
import EditPatient from './pages/Patients/EditPatient';

import { patients as initialPatients } from './fakeData/Patients';

import PatientsList from './pages/Patients/PatientsList';
import PatientsListAdmin from './pages/Admin/Patients/PatientsListAdmin';
import AddPatient from './pages/Patients/AddPatient';

import AddPatientAdmin from './pages/Admin/Patients/AddPatientAdmin'
import EditPatientAdmin from './pages/Admin/Patients/EditPatientAdmin'
import PatientDetailsAdmin from './pages/Admin/Patients/PatientDetailsAdmin'

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
          <Route path = "/admin/login" element={<AdminLogin/>} />
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
          <Route path = "/admin/new-patient" element={<AddPatientAdmin addPatient={addPatient}/>} />
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
          <Route 
            path = "/admin/patients"
            element={
            <TablePage 
              patients={patients} 
              titleName="Список пациентов" 
              buttonName="Добавить нового пациента" 
              buttonLink="/admin/new-patient" 
              deletePatient={deletePatient}
              ListComponent={PatientsListAdmin}  
            />
            } 
          />
          <Route path = "/admin/patients/:patientId" element={<PatientDetailsAdmin patients={patients} />} />
          <Route path="/admin/patients/:patientId/edit" element={<EditPatientAdmin patients={patients} updatePatient={updatePatient} />} />
          <Route path = "/patients/:patientId" element={<PatientDetails patients={patients} />} />
          <Route path="/patients/:patientId/edit" element={<EditPatient patients={patients} updatePatient={updatePatient} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
