import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import PatientDetailsComponent from '../../components/Patients/PatientDetailsComponent';
import { usePatient } from '../../context/PatientContext';
import usePatientData from '../../hooks/usePatients';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Patients/ErrorAlertPatientNotFound';

const PatientDetails = ({ isAdmin = false }) => {
  const { patientId } = useParams();
  const { state } = useLocation();
  const { patient, setPatient } = usePatient();
  const { loading, error } = usePatientData({ patientId, setPatient });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор пациента или попробуйте еще раз." />;
  }

  if (!patient) {
    return <ErrorAlert message="Пациент не найден." />;
  }

  const backLink = state?.fromTrash ? '/admin/patients/trash' : isAdmin ? "/admin/patients" : "/patients";
  const notesLink = isAdmin ? `/admin/patients/${patientId}/notes` : `/patients/${patientId}/notes`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <PatientDetailsComponent patient={patient} />
        <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between flex-wrap">
            {!patient.isDeleted && (
              <>
                <Button
                  variant="success"
                  as={Link}
                  to={isAdmin ? `/admin/patients/${patientId}/edit` : `/patients/${patientId}/edit`}
                  className="px-4 py-2 rounded-pill mb-2"
                >
                  Изменить информацию
                </Button>
                <Button
                  variant="primary"
                  as={Link}
                  to={isAdmin ? `/admin/patients/${patientId}/new-note` : `/patients/${patientId}/new-note`}
                  className="px-4 py-2 rounded-pill mb-2"
                >
                  Записать на приём
                </Button>
              </>
            )}
            <Button
              variant="secondary"
              as={Link}
              to={backLink}
              className="px-4 py-2 rounded-pill mb-2"
            >
              Вернуться
            </Button>
          </div>
          {!patient.isDeleted && (
            <div className="mt-3">
              <Button
                variant="info"
                as={Link}
                to={notesLink}
                className="px-4 py-2 rounded-pill"
              >
                Посмотреть записи пациента
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientDetails;