import React from 'react';
import { Card } from 'react-bootstrap';

const PatientDetailsComponent = ({ patient }) => {
  return (
    <>
      <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">
            Детали пациента: <br/> {patient.lastName} {patient.firstName} {patient.middleName}
          </h2>
        </Card.Header>
        <Card.Body className="p-5 pb-0">
          {/* Enhanced styling for patient details */}
          <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
            <strong>Пол:</strong> {patient.gender}
          </Card.Text>
          <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
            <strong>Дата рождения:</strong> {patient.dateOfBirth}
          </Card.Text>
          <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
            <strong>Номер телефона:</strong> {patient.phoneNumber}
          </Card.Text>
          <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
            <strong>Информация по страховке:</strong> {patient.insuranceInfo}
          </Card.Text>
        </Card.Body>
    </>
  );
};

export default PatientDetailsComponent;