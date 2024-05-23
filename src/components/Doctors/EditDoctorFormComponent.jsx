import React from 'react';
import { Form } from 'react-bootstrap';
import { GreenFormCheck, GreenFormControl } from '../../styles/GreenForm.js';

const EditDoctorFormComponent = ({ formData, handleChange, handleGenderChange }) => {
  return (
    <>
      <Form.Group controlId="firstName" className="mb-4">
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
      <Form.Group controlId="lastName" className="mb-4">
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
      <Form.Group controlId="middleName" className="mb-4">
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
      <Form.Group controlId="dateOfBirth" className="mb-4">
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
      <Form.Group controlId="education" className="mb-4">
        <Form.Label>Образование</Form.Label>
        <Form.Control
          as="textarea"
          name="education"
          value={formData.education}
          onChange={handleChange}
          style={{
            borderRadius: '0.5rem',
            boxShadow: '0 0 0 0.2rem rgba(25, 135, 84, 0.25)',
            borderColor: '#13653f'
          }}
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber" className="mb-4">
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
      <Form.Group controlId="emailAddress" className="mb-4">
        <Form.Label>Email</Form.Label>
        <GreenFormControl
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите Email"
        />
      </Form.Group>
    </>
  );
};

export default EditDoctorFormComponent;
