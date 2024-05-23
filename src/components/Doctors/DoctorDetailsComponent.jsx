import React from 'react';
import { Card } from 'react-bootstrap';

const DoctorDetailsComponent = ({ doctor }) => {
  return (
    <>
      <Card.Header className="bg-success text-white p-4 rounded-top text-center">
        <h2 className="m-0">
          Детали врача: <br /> {doctor.lastName} {doctor.firstName} {doctor.middleName}
        </h2>
      </Card.Header>
      <Card.Body className="p-5 pb-0">
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Пол:</strong> {doctor.gender}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Дата рождения:</strong> {doctor.dateOfBirth}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Образование:</strong> {doctor.education}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Номер телефона:</strong> {doctor.phoneNumber}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Email:</strong> {doctor.emailAddress}
        </Card.Text>
      </Card.Body>
    </>
  );
};

export default DoctorDetailsComponent;
