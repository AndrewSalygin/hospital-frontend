import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { GreenFormCheck, GreenFormControl } from '../../styles/GreenForm.js';

const AddPatient = ({ addPatient }) => {
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
    navigate('/patients'); // Redirect to the patients list page
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-success text-white p-4 rounded-top text-center">
          <h2 className="m-0">Добавить нового пациента</h2>
        </Card.Header>
        <Card.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Имя</Form.Label>
              <GreenFormControl
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill"
                placeholder="Введите имя"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Фамилия</Form.Label>
              <GreenFormControl
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill"
                placeholder="Введите фамилию"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Отчество</Form.Label>
              <GreenFormControl
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill"
                placeholder="Введите отчество"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Пол</Form.Label>
              <div>
                <GreenFormCheck
                  inline
                  type="radio"
                  name="gender"
                  value="М"
                  label="М"
                  checked={formData.gender === 'М'}
                  onChange={handleGenderChange}
                />
                <GreenFormCheck
                  inline
                  type="radio"
                  name="gender"
                  value="Ж"
                  label="Ж"
                  checked={formData.gender === 'Ж'}
                  onChange={handleGenderChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Дата рождения</Form.Label>
              <GreenFormControl
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Номер телефона</Form.Label>
              <GreenFormControl
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill"
                placeholder="Введите номер телефона"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Информация по страховке</Form.Label>
              <GreenFormControl
                type="text"
                name="insuranceInfo"
                value={formData.insuranceInfo}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill"
                placeholder="Введите информацию по страховке"
              />
            </Form.Group>
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