import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Spinner } from 'react-bootstrap';
import EditPatientFormComponent from '../../components/Patients/EditPatientFormComponent.jsx';
import { usePatient } from '../../context/PatientContext';
import { updatePatient } from '../../api/Patients';

const EditPatient = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { patient, setPatient } = usePatient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInfo: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({ ...patient });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [patient]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Alert variant="danger" className="mt-4">
        <h2>Ошибка: Пациент не найден</h2>
      </Alert>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPatient = await updatePatient(patientId, formData);
      setPatient(updatedPatient);
      navigate(`/patients/${patientId}`);
    } catch (error) {
      setError('Ошибка при обновлении данных пациента. Попробуйте еще раз.');
    }
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Изменить информацию о пациенте: {formData.lastName} {formData.firstName} {formData.middleName}</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <EditPatientFormComponent
              formData={formData}
              handleChange={handleChange}
              handleGenderChange={handleGenderChange}
            />
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit" className="px-4 py-2 rounded-pill">Сохранить изменения</Button>
              <Button variant="secondary" as={Link} to={`/patients/${patientId}`} className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPatient;