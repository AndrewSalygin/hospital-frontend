import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import EditDoctorFormComponent from '../../components/Doctors/EditDoctorFormComponent';
import { useDoctor } from '../../context/DoctorContext';
import useDoctors from '../../hooks/useDoctors';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Doctors/ErrorAlertDoctorNotFound';

const EditDoctor = ({ isAdmin = false }) => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { doctor, setDoctor } = useDoctor();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleGenderChange,
    handleSubmit
  } = useDoctors({ doctorId, setDoctor, isAdmin });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор врача или попробуйте еще раз." />;
  }

  const backLink = state?.fromTrash ? '/admin/doctors/trash' : isAdmin ? `/admin/doctors/${doctorId}` : `/doctors/${doctorId}`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Изменить информацию о враче: {formData.lastName} {formData.firstName} {formData.middleName}</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e, navigate)}>
            <EditDoctorFormComponent
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

export default EditDoctor;