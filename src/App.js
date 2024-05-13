import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Authorization/Login';
import AdminLogin from './pages/Authorization/AdminLogin'
import Registration from './pages/Authorization/Registration'
import TablePage from './components/TablePage'
import PatientDetails from './pages/Patients/PatientDetails'
import EditPatient from './pages/Patients/EditPatient';

import PatientsList from './pages/Patients/PatientsList';
import PatientsListAdmin from './pages/Admin/Patients/PatientsListAdmin';
import AddPatient from './pages/Patients/AddPatient';

import AddPatientAdmin from './pages/Admin/Patients/AddPatientAdmin'
import EditPatientAdmin from './pages/Admin/Patients/EditPatientAdmin'
import PatientDetailsAdmin from './pages/Admin/Patients/PatientDetailsAdmin'
import TrashPatientsListAdmin from './pages/Admin/Patients/TrashPatientsListAdmin';
import UsersListAdmin from './pages/Admin/Users/UsersListAdmin';

import { PatientProvider } from './context/PatientContext';

import { users as initialUsers } from './fakeData/Users';

import { deletePatient, deleteForeverPatient, unDeletePatient } from './scripts/PatientsScripts'
import { deleteForeverUser, changeRights } from './scripts/UsersScripts';

function App() {
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState(initialUsers);

  return (
    <>
      <BrowserRouter>
        <PatientProvider>
        <Routes>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/register" element={<Registration/>} />
          <Route path = "/admin/login" element={<AdminLogin/>} />
          <Route 
            path = "/admin/users"
            element={
            <TablePage 
              users={ users } 
              deleteUser = { (userId) => { deleteForeverUser(users, setUsers, userId) } }
              changeRights = { (userId, newRole) => { changeRights(users, setUsers, userId, newRole) } }
              titleName="Список пользователей"
              ListComponent={UsersListAdmin}  
            />
            } 
          />
          <Route 
            path = "/patients"
            element={
            <TablePage 
              patients={patients}
              setPatients = {setPatients}
              titleName="Список пациентов" 
              buttonName="Добавить нового пациента" 
              buttonLink="/new-patient" 
              ListComponent={PatientsList}  
            />
            } 
          />
          <Route path = "/admin/new-patient" element={<AddPatientAdmin />} />
          <Route path = "/new-patient" element={<AddPatient />} />
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
              deletePatient={(patientId) => deletePatient(patients, setPatients, patientId)}
              ListComponent={PatientsListAdmin}  
            />
            } 
          />
          <Route 
            path = "/admin/patients/trash"
            element={
            <TablePage 
              patients={patients} 
              titleName="Список пациентов в архиве" 
              deletePatient={(patientId) => deleteForeverPatient(patients, setPatients, patientId)}
              unDeletePatient={(patientId) => unDeletePatient(patients, setPatients, patientId)}
              ListComponent={TrashPatientsListAdmin}  
            />
            } 
          />
          <Route path = "/admin/patients/:patientId" element={<PatientDetailsAdmin />} />
          <Route path="/admin/patients/:patientId/edit" element={<EditPatientAdmin />} />
          <Route path = "/patients/:patientId" element={<PatientDetails />} />
          <Route path="/patients/:patientId/edit" element={<EditPatient />} />
          </Routes>
        </PatientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
