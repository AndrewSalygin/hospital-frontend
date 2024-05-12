import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import AddPatientFormComponent from '../../../components/Patients/AddPatientFormComponent.jsx';

const AddPatientAdmin = ({ addPatient }) => {
  const navigate = useNavigate();

  // Initialize the form state with default empty values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient(formData); // Call the add patient handler
    navigate('/admin/patients'); // Redirect to the patients list page
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Добавить нового пациента</h2>
        </Card.Header>
        <Card.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <AddPatientFormComponent
              formData={formData}
              handleChange={handleChange}
              handleGenderChange={handleGenderChange}
            />
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit" className="px-4 py-2 rounded-pill">Добавить пациента</Button>
              <Button variant="secondary" as={Link} to="/admin/patients" className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPatientAdmin;