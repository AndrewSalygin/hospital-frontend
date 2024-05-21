import React from 'react';
import { Form } from 'react-bootstrap';
import { GreenFormControl } from '../../../styles/GreenForm';

const PatientSearchForm = ({ searchTerms, handleSearchChange }) => (
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
      placeholder="Поиск по дате рождения..."
      name="dateOfBirth"
      value={searchTerms.dateOfBirth}
      onChange={handleSearchChange}
      className="mb-2"
    />
  </Form>
);

export default React.memo(PatientSearchForm);