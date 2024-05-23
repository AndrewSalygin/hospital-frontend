import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    phoneNumber: '',
    emailAddress: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/super-admin-doctors', formData);
      navigate('/admin/doctors');
    } catch (error) {
      setError('Не удалось добавить врача');
    }
  };

  return (
    <Container className="mt-3">
      <h2>Добавить нового врача</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="lastName">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="middleName">
          <Form.Label>Отчество</Form.Label>
          <Form.Control
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Пол</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Выберите пол</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="education">
          <Form.Label>Образование</Form.Label>
          <Form.Control
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="emailAddress">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </Container>
  );
};

export default AddDoctor;
