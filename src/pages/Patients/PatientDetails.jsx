import React from 'react';
import { useParams, Link  } from 'react-router-dom';
import { Card, Alert, Container, Button } from 'react-bootstrap';

const PatientDetails = ({ patients }) => {
  const { patientId } = useParams();
  const patient = patients.find(p => p.patientId.toString() === patientId);

  if (!patient) {
    return (
        <Container>
            <Alert variant="danger" className="mt-4">
                <h2>Ошибка: Пациент не найден</h2>
                <p>Пожалуйста, проверьте идентификатор пациента или попробуйте еще раз.</p>
            </Alert>
        </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">
            Детали пациента: <br/> {patient.lastName} {patient.firstName} {patient.middleName}
          </h2>
        </Card.Header>
        <Card.Body className="p-5">
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

          {/* Edit and Back buttons */}
          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              as={Link}
              to={`/patients/${patientId}/edit`}
              className="px-4 py-2 rounded-pill"
            >
              Изменить информацию
            </Button>
            <Button
              variant="secondary"
              as={Link}
              to="/patients"
              className="px-4 py-2 rounded-pill"
            >
              Вернуться
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientDetails;