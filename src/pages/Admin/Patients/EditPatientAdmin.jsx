import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { GreenFormCheck, GreenFormControl } from '../../../styles/GreenForm.js';
import EditPatientFormComponent from '../../../components/Patients/EditPatientFormComponent.jsx';

const EditPatientAdmin = ({ patients, updatePatient }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  // Find the patient first
  const existingPatient = patients.find(p => p.patientId.toString() === patientId);

  // Initialize the form state with the existing patient's data or default values
  const [formData, setFormData] = useState(existingPatient ? { ...existingPatient } : {
    patientId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInfo: ''
  });

  if (!existingPatient) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient(formData); // Pass updated data to the handler function
    navigate(`/admin/patients/${patientId}`); // Redirect to the patient's details page
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Изменить информацию о пациенте: {existingPatient.lastName} {existingPatient.firstName} {existingPatient.middleName}</h2>
        </Card.Header>
        <Card.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <EditPatientFormComponent
                formData={formData}
                handleChange={handleChange}
                handleGenderChange={handleGenderChange}
              />
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit" className="px-4 py-2 rounded-pill">Сохранить изменения</Button>
              <Button variant="secondary" as={Link} to={`/admin/patients/${patientId}`} className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPatientAdmin;