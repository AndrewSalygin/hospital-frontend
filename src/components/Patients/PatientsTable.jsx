import React from 'react';
import { Table } from 'react-bootstrap';

const PatientsTable = ({ patients, handleRowClick }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Пол</th>
        <th>Дата рождения</th>
      </tr>
    </thead>
    <tbody>
      {patients.map((patient, index) => (
        <tr
          key={patient.patientId}
          onClick={() => handleRowClick(patient.patientId)}
          style={{ cursor: 'pointer' }}
        >
          <td>{index + 1}</td>
          <td>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{patient.middleName}</td>
          <td>{patient.gender}</td>
          <td>{patient.dateOfBirth}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default React.memo(PatientsTable);