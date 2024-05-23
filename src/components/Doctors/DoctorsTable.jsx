import React from 'react';
import { Table, Button } from 'react-bootstrap';

const DoctorsTable = ({ doctors, handleRowClick, handleDelete, handleUnDelete, isAdmin, isTrash }) => (
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
        {isAdmin || isTrash ? <th>Действия</th> : null}
      </tr>
    </thead>
    <tbody>
      {doctors.map((doctor, index) => (
        <tr
          key={`${doctor.doctorId}-${index}`}
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
          {isAdmin || isTrash ? (
            <td>
              {isTrash ? (
                <Button
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); handleUnDelete(doctor.doctorId); }}
                >
                  Вернуть из архива
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={(e) => { e.stopPropagation(); handleDelete(doctor.doctorId); }}
                >
                  Удалить
                </Button>
              )}
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DoctorsTable;