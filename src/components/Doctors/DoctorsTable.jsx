import React from 'react';
import { Table, Button } from 'react-bootstrap';

const DoctorsTable = ({ doctors, handleRowClick, handleDelete, isAdmin }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Пол</th>
        <th>Дата рождения</th>
        <th>Специализация</th>
        {isAdmin && <th>Действия</th>}
      </tr>
    </thead>
    <tbody>
      {doctors.map((doctor, index) => (
        <tr
          key={doctor.doctorId}
          onClick={() => handleRowClick(doctor.doctorId)}
          style={{ cursor: 'pointer' }}
        >
          <td>{index + 1}</td>
          <td>{doctor.lastName}</td>
          <td>{doctor.firstName}</td>
          <td>{doctor.middleName}</td>
          <td>{doctor.gender}</td>
          <td>{doctor.dateOfBirth}</td>
          <td>{doctor.specializationName}</td>
          {isAdmin && (
            <td>
              <Button
                variant="danger"
                onClick={(e) => { e.stopPropagation(); handleDelete(doctor.doctorId); }}
              >
                Удалить
              </Button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default React.memo(DoctorsTable);
