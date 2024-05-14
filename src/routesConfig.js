import React from 'react';
import Login from './pages/Authorization/Login';
import AdminLogin from './pages/Authorization/AdminLogin';
import Registration from './pages/Authorization/Registration';
import TablePage from './components/TablePage';
import PatientsList from './pages/Patients/PatientsList';
import PatientsListAdmin from './pages/Admin/Patients/PatientsListAdmin';
import AddPatient from './pages/Patients/AddPatient';
import AddPatientAdmin from './pages/Admin/Patients/AddPatientAdmin';
import EditPatientAdmin from './pages/Admin/Patients/EditPatientAdmin';
import PatientDetailsAdmin from './pages/Admin/Patients/PatientDetailsAdmin';
import TrashPatientsListAdmin from './pages/Admin/Patients/TrashPatientsListAdmin';
import UsersListAdmin from './pages/Admin/Users/UsersListAdmin';
import PatientDetails from './pages/Patients/PatientDetails';
import EditPatient from './pages/Patients/EditPatient';
import { deleteForeverUser, changeRights } from './scripts/UsersScripts';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

export const routesConfig = (patients, setPatients, users, setUsers, handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient) => {
  const userActions = {
    users,
    deleteUser: (userId) => { deleteForeverUser(users, setUsers, userId) },
    changeRights: (userId, newRole) => { changeRights(users, setUsers, userId, newRole) }
  };

  const patientActions = {
    patients,
    setPatients,
    deletePatient: handleDeletePatient,
    deleteForeverPatient: handleDeleteForeverPatient,
    unDeletePatient: handleUnDeletePatient
  };

  return [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Registration /> },
    { path: "/admin/login", element: <AdminLogin /> },
    {
      path: "/admin/users",
      element: (
        <ProtectedRoute element={
          <TablePage
            data={userActions}
            titleName="Список пользователей"
            ListComponent={UsersListAdmin}
          />
        } />
      ),
    },
    {
      path: "/patients",
      element: (
        <ProtectedRoute element={
          <TablePage
            data={patientActions}
            titleName="Список пациентов"
            buttonName="Добавить нового пациента"
            buttonLink="/new-patient"
            ListComponent={PatientsList}
          />
        } />
      ),
    },
    { path: "/admin/new-patient", element: <ProtectedRoute element={<AddPatientAdmin />} /> },
    { path: "/new-patient", element: <ProtectedRoute element={<AddPatient />} /> },
    {
      path: "/admin/patients",
      element: (
        <ProtectedRoute element={
          <TablePage
            data={patientActions}
            titleName="Список пациентов"
            buttonName="Добавить нового пациента"
            buttonLink="/admin/new-patient"
            ListComponent={PatientsListAdmin}
          />
        } />
      ),
    },
    {
      path: "/admin/patients/trash",
      element: (
        <ProtectedRoute element={
          <TablePage
            data={patientActions}
            titleName="Список пациентов в архиве"
            ListComponent={TrashPatientsListAdmin}
          />
        } />
      ),
    },
    { path: "/admin/patients/:patientId", element: <ProtectedRoute element={<PatientDetailsAdmin />} /> },
    { path: "/admin/patients/:patientId/edit", element: <ProtectedRoute element={<EditPatientAdmin />} /> },
    { path: "/patients/:patientId", element: <ProtectedRoute element={<PatientDetails />} /> },
    { path: "/patients/:patientId/edit", element: <ProtectedRoute element={<EditPatient />} /> },
    { path: "*", element: <NotFound /> },
  ];
};