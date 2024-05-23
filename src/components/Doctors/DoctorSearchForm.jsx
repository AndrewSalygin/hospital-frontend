import React from 'react';
import { Form } from 'react-bootstrap';
import { GreenFormControl } from './../../styles/GreenForm';

const DoctorSearchForm = ({ searchTerms, handleSearchChange }) => (
  <Form className="mb-3">
    <GreenFormControl
      type="text"
      placeholder="Поиск по фамилии..."
      name="lastName"
      value={searchTerms.lastName}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <GreenFormControl
      type="text"
      placeholder="Поиск по имени..."
      name="firstName"
      value={searchTerms.firstName}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <GreenFormControl
      type="text"
      placeholder="Поиск по отчеству..."
      name="middleName"
      value={searchTerms.middleName}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <GreenFormControl
      type="text"
      placeholder="Поиск по специализации..."
      name="specializationName"
      value={searchTerms.specializationName}
      onChange={handleSearchChange}
      className="mb-2"
    />
  </Form>
);

export default React.memo(DoctorSearchForm);