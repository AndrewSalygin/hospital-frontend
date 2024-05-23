import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const ErrorAlertDoctorNotFound = ({ message }) => (
  <Container>
    <Alert variant="danger" className="mt-4">
      <h2>Ошибка: Врач не найден</h2>
      <p>{message}</p>
    </Alert>
  </Container>
);

export default ErrorAlertDoctorNotFound;
