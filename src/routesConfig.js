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

export const routesConfig = (patients, setPatients, users, setUsers, handleDeletePatient, handleDeleteForeverPatient, handleUnDeletePatient) => [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registration /> },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin/users",
    element: (
      <TablePage
        users={users}
        deleteUser={(userId) => { deleteForeverUser(users, setUsers, userId) }}
        changeRights={(userId, newRole) => { changeRights(users, setUsers, userId, newRole) }}
        titleName="Список пользователей"
        ListComponent={UsersListAdmin}
      />
    ),
  },
  {
    path: "/patients",
    element: (
      <TablePage
        patients={patients}
        setPatients={setPatients}
        titleName="Список пациентов"
        buttonName="Добавить нового пациента"
        buttonLink="/new-patient"
        ListComponent={PatientsList}
      />
    ),
  },
  { path: "/admin/new-patient", element: <AddPatientAdmin /> },
  { path: "/new-patient", element: <AddPatient /> },
  {
    path: "/admin/patients",
    element: (
      <TablePage
        patients={patients}
        titleName="Список пациентов"
        buttonName="Добавить нового пациента"
        buttonLink="/admin/new-patient"
        deletePatient={handleDeletePatient}
        ListComponent={PatientsListAdmin}
      />
    ),
  },
  {
    path: "/admin/patients/trash",
    element: (
      <TablePage
        patients={patients}
        titleName="Список пациентов в архиве"
        deletePatient={handleDeleteForeverPatient}
        unDeletePatient={handleUnDeletePatient}
        ListComponent={TrashPatientsListAdmin}
      />
    ),
  },
  { path: "/admin/patients/:patientId", element: <PatientDetailsAdmin /> },
  { path: "/admin/patients/:patientId/edit", element: <EditPatientAdmin /> },
  { path: "/patients/:patientId", element: <PatientDetails /> },
  { path: "/patients/:patientId/edit", element: <EditPatient /> },
];