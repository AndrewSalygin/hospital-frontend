import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import PatientDetailsComponent from '../../components/Patients/PatientDetailsComponent';
import { usePatient } from '../../context/PatientContext';
import useFetchPatient from '../../hooks/useFetchPatient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const PatientDetails = () => {
  const { patientId } = useParams();
  const { patient, setPatient } = usePatient();
  const { loading, error } = useFetchPatient(patientId, setPatient);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор пациента или попробуйте еще раз." />;
  }

  if (!patient) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор пациента или попробуйте еще раз." />;
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