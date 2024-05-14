import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import AddPatientFormComponent from '../../components/Patients/AddPatientFormComponent';
import usePatientForm from '../../hooks/usePatientForm';

const AddPatient = () => {
  const navigate = useNavigate();
  const { formData, error, handleChange, handleGenderChange, handleSubmit } = usePatientForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      navigate('/patients');
    }
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Добавить нового пациента</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={onSubmit}>
            <AddPatientFormComponent
              formData={formData}
              handleChange={handleChange}
              handleGenderChange={handleGenderChange}
            />
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit" className="px-4 py-2 rounded-pill">Добавить пациента</Button>
              <Button variant="secondary" as={Link} to="/patients" className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPatient;