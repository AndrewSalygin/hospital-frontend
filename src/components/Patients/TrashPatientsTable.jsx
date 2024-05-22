import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TrashPatientsTable = ({ patients, handleRowClick, handleUnDelete }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Пол</th>
        <th>Дата рождения</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      {patients.map((patient, index) => (
        <tr key={patient.patientId}>
          <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>{index + 1}</td>
          <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>{patient.lastName}</td>
          <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>{patient.firstName}</td>
          <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>{patient.middleName}</td>
          <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>{patient.gender}</td>
          <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>{patient.dateOfBirth}</td>
          <td>
            <Button variant="secondary" onClick={() => handleUnDelete(patient.patientId)}>
              Вернуть из архива
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default React.memo(TrashPatientsTable);
