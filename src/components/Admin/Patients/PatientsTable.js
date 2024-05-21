import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PatientsTable = ({ patients, handleRowClick, handleDelete }) => (
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
          <td>
            <Button variant="danger" size="sm" onClick={(e) => {
              e.stopPropagation();
              handleDelete(patient.patientId);
            }}>
              Удалить
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default React.memo(PatientsTable);