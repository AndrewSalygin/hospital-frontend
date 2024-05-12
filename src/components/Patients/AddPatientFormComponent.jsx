import React from 'react';
import { Form } from 'react-bootstrap';
import { GreenFormCheck, GreenFormControl } from '../../styles/GreenForm.js';

const AddPatientFormComponent = ({ formData, handleChange, handleGenderChange }) => {
  return (
    <>
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
    </>
  );
};

export default AddPatientFormComponent;