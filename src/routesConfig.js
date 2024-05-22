import React from 'react';
import TablePage from './components/UIComponents/TablePage';
import PatientsList from './pages/Patients/PatientsList';
import AddPatient from './pages/Patients/AddPatient';
import TrashPatientsListAdmin from './pages/Patients/TrashPatientsListAdmin';
import UsersListAdmin from './pages/Admin/Users/UsersListAdmin';
import PatientDetails from './pages/Patients/PatientDetails';
import EditPatient from './pages/Patients/EditPatient';
import { deleteForeverUser, changeRights } from './scripts/UsersScripts';
import ProtectedRoute from './components/UtilComponents/ProtectedRoute';
import NotFound from './pages/UtilPages/NotFound';

export const routesConfig = ({
  patients, setPatients,
  users, setUsers,
  handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient
}) => {
  // Действия, связанные с пользователями
  const userActions = {
    users,
    deleteUser: (userId) => { deleteForeverUser(users, setUsers, userId) },
    changeRights: (userId, newRole) => { changeRights(users, setUsers, userId, newRole) }
  };

  // Действия, связанные с пациентами
  const patientActions = {
    patients,
    setPatients,
    deletePatient: handleDeletePatient,
    deleteForeverPatient: handleDeleteForeverPatient,
    unDeletePatient: handleUnDeletePatient
  };

  // Возвращаем массив объектов, описывающих маршруты
  return [
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
            ListComponent={(props) => <PatientsList {...props} isAdmin={false} />}
          />
        } />
      ),
    },
    { path: "/admin/new-patient", element: <ProtectedRoute element={<AddPatient isAdmin={true} />} /> },
    { path: "/new-patient", element: <ProtectedRoute element={<AddPatient isAdmin={false} />} /> },
    {
      path: "/admin/patients",
      element: (
        <ProtectedRoute element={
          <TablePage
            data={patientActions}
            titleName="Список пациентов"
            buttonName="Добавить нового пациента"
            buttonLink="/admin/new-patient"
            ListComponent={(props) => <PatientsList {...props} isAdmin={true} />}
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
    { path: "/admin/patients/:patientId", element: <ProtectedRoute element={<PatientDetails isAdmin={true} />} /> },
    { path: "/admin/patients/:patientId/edit", element: <ProtectedRoute element={<EditPatient isAdmin={true} />} /> },
    { path: "/patients/:patientId", element: <ProtectedRoute element={<PatientDetails isAdmin={false} />} /> },
    { path: "/patients/:patientId/edit", element: <ProtectedRoute element={<EditPatient isAdmin={false} />} /> },
    { path: "*", element: <NotFound /> },
  ];
};