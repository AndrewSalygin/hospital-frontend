import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import EditPatientFormComponent from '../../components/Patients/EditPatientFormComponent';
import { usePatient } from '../../context/PatientContext';
import usePatientData from '../../hooks/usePatients.js';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner.jsx';
import ErrorAlert from '../../components/Patients/ErrorAlertPatientNotFound';

const EditPatient = ({ isAdmin = false }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { patient, setPatient } = usePatient();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleGenderChange,
    handleSubmit
  } = usePatientData({ patientId, setPatient, isAdmin });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор пациента или попробуйте еще раз." />;
  }

  const backLink = state?.fromTrash ? '/admin/patients/trash' : isAdmin ? `/admin/patients/${patientId}` : `/patients/${patientId}`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Изменить информацию о пациенте: {formData.lastName} {formData.firstName} {formData.middleName}</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e, navigate)}>
            <EditPatientFormComponent
              formData={formData}
              handleChange={handleChange}
              handleGenderChange={handleGenderChange}
            />
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit" className="px-4 py-2 rounded-pill">Сохранить изменения</Button>
              <Button variant="secondary" as={Link} to={backLink} className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPatient;