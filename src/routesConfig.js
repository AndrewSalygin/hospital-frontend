import React from 'react';
import TablePage from './components/UIComponents/TablePage';
import PatientsList from './pages/Patients/PatientsList';
import AddPatient from './pages/Patients/AddPatient';
import TrashPatientsListAdmin from './pages/Patients/TrashPatientsListAdmin';
import UsersListAdmin from './pages/Users/UsersList';
import PatientDetails from './pages/Patients/PatientDetails';
import EditPatient from './pages/Patients/EditPatient';
import ProtectedRouteWithRole from './components/UtilComponents/ProtectedRouteWithRole';
import NotFound from './pages/UtilPages/NotFound';
import NewNote from './pages/Journal/NewNote';

export const routesConfig = () => {
  return [
    {
      path: "/super-admin/users",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список пользователей"
            ListComponent={UsersListAdmin}
          />
        } allowedRoles={["SUPER-ADMIN"]} />
      ),
    },
    {
      path: "/patients",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список пациентов"
            buttonName="Добавить нового пациента"
            buttonLink="/new-patient"
            ListComponent={(props) => <PatientsList {...props} isAdmin={false} />}
          />
        } allowedRoles={["DOCTOR", "ADMIN", "SUPER-ADMIN"]} />
      ),
    },
    { path: "/admin/new-patient", element: <ProtectedRouteWithRole element={<AddPatient isAdmin={true} />} allowedRoles={["ADMIN", "SUPER-ADMIN"]} /> },
    { path: "/new-patient", element: <ProtectedRouteWithRole element={<AddPatient isAdmin={false} />} allowedRoles={["DOCTOR", "ADMIN", "SUPER-ADMIN"]} /> },
    {
      path: "/admin/patients",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список пациентов"
            buttonName="Добавить нового пациента"
            buttonLink="/admin/new-patient"
            ListComponent={(props) => <PatientsList {...props} isAdmin={true} />}
          />
        } allowedRoles={["ADMIN", "SUPER-ADMIN"]} />
      ),
    },
    {
      path: "/admin/patients/trash",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список пациентов в архиве"
            ListComponent={TrashPatientsListAdmin}
          />
        } allowedRoles={["ADMIN", "SUPER-ADMIN"]} />
      ),
    },
    { path: "/admin/patients/:patientId", element: <ProtectedRouteWithRole element={<PatientDetails isAdmin={true} />} allowedRoles={["ADMIN", "SUPER-ADMIN"]} /> },
    { path: "/admin/patients/:patientId/edit", element: <ProtectedRouteWithRole element={<EditPatient isAdmin={true} />} allowedRoles={["ADMIN", "SUPER-ADMIN"]} /> },
    { path: "/patients/:patientId", element: <ProtectedRouteWithRole element={<PatientDetails isAdmin={false} />} allowedRoles={["DOCTOR", "ADMIN", "SUPER-ADMIN"]} /> },
    { path: "/patients/:patientId/edit", element: <ProtectedRouteWithRole element={<EditPatient isAdmin={false} />} allowedRoles={["DOCTOR", "ADMIN", "SUPER-ADMIN"]} /> },
    { path: "/admin/patients/:patientId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={true} />} allowedRoles={["ADMIN", "SUPER-ADMIN"]} /> },
    { path: "/patients/:patientId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={false} />} allowedRoles={["DOCTOR", "ADMIN", "SUPER-ADMIN"]} /> },
    { path: "*", element: <NotFound /> },
  ];
};