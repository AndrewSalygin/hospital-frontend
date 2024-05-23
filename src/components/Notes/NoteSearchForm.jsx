import React from 'react';
import { Form } from 'react-bootstrap';
import { GreenFormControl } from './../../styles/GreenForm';

const NoteSearchForm = ({ searchTerms, handleSearchChange }) => (
  <Form className="mb-3">
    <GreenFormControl
      type="text"
      placeholder="Поиск по статусу пациента..."
      name="patientStatus"
      value={searchTerms.patientStatus}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <GreenFormControl
      type="text"
      placeholder="Поиск по имени доктора..."
      name="doctorName"
      value={searchTerms.doctorName}
      onChange={handleSearchChange}
      className="mb-2"
    />
  </Form>
);

export default React.memo(NoteSearchForm);