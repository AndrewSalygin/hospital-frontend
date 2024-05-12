import React from 'react';
import { useParams, Link  } from 'react-router-dom';
import { Card, Alert, Container, Button } from 'react-bootstrap';
import PatientDetailsComponent from '../../../components/Patients/PatientDetailsComponent';

const PatientDetailsAdmin = ({ patients }) => {
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
          <PatientDetailsComponent
            patient= { patient }
          />
          <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              as={Link}
              to={`/admin/patients/${patientId}/edit`}
              className="px-4 py-2 rounded-pill"
            >
              Изменить информацию
            </Button>
            <Button
              variant="secondary"
              as={Link}
              to="/admin/patients"
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

export default PatientDetailsAdmin;