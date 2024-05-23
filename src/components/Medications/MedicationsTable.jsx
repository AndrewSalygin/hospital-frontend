import React from 'react';
import { Table, Button } from 'react-bootstrap';

const MedicationsTable = ({ medications, handleRowClick, handleDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Форма</th>
          <th>Дозировка</th>
          <th>Производитель</th>
          <th>Страна</th>
          <th>Дата производства</th>
          <th>Дата истечения</th>
          <th>Цена</th>
          <th>Доступное количество</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((medication, index) => (
          <tr key={medication.medicationId} onClick={() => handleRowClick(medication.medicationId)} style={{ cursor: 'pointer' }}>
            <td>{index + 1}</td>
            <td>{medication.medicationName}</td>
            <td>{medication.medicationForm}</td>
            <td>{medication.dosage}</td>
            <td>{medication.manufacturer}</td>
            <td>{medication.countryOfManufacture}</td>
            <td>{new Date(medication.dateOfManufacture).toLocaleDateString()}</td>
            <td>{new Date(medication.expireDate).toLocaleDateString()}</td>
            <td>{medication.price}</td>
            <td>{medication.availableCount}</td>
            <td>
              <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(medication.medicationId); }}>Удалить</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MedicationsTable;
