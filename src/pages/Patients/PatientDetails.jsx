import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Alert, Container, Button, Spinner } from 'react-bootstrap';
import { getPatient } from '../../api/Patients';
import PatientDetailsComponent from '../../components/Patients/PatientDetailsComponent';
import { usePatient } from '../../context/PatientContext';

const PatientDetails = () => {
  const { patientId } = useParams();
  const { patient, setPatient } = usePatient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        console.log(`Fetching patient with ID: ${patientId}`);
        const data = await getPatient(patientId);
        console.log('Fetched patient data:', data);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patient:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId, setPatient]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only"/>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-4">
          <h2>Ошибка: Пациент не найден</h2>
          <p>Пожалуйста, проверьте идентификатор пациента или попробуйте еще раз.</p>
        </Alert>
      </Container>
    );
  }

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
        <PatientDetailsComponent patient={patient} />
        <Card.Body className="p-5 pt-0">
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