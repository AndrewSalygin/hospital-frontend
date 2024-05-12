import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/greenPagination.css'

const PatientsList = ({ patients }) => {
  // State variables for search term and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5; // Customize the number of patients per page

  // Update filteredPatients based on search term
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredPatients(
      patients.filter((patient) =>
        Object.values(patient)
          .join(' ')
          .toLowerCase()
          .includes(lowercasedTerm)
      )
    );
  }, [searchTerm, patients]);

  // Calculate pagination details
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Update page number
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  // Function to handle row click
  const handleRowClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <div className="container mt-3">
      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Поиск по любому полю..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      {/* Patients Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Пол</th>
            <th>Дата рождения</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient, index) => (
            <tr
              key={patient.patientId}
              onClick={() => handleRowClick(patient.patientId)}
              style={{ cursor: 'pointer' }}
            >
              <td>{indexOfFirstPatient + index + 1}</td>
              <td>{patient.lastName}</td>
              <td>{patient.firstName}</td>
              <td>{patient.middleName}</td>
              <td>{patient.gender}</td>
              <td>{patient.dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  
      {/* Pagination Component */}
      <Pagination className="pagination-success mt-3">
        <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1}>
          Назад
        </Pagination.Prev>
  
        {[...Array(totalPages)].map((_, pageIndex) => (
          <Pagination.Item
            key={pageIndex + 1}
            active={pageIndex + 1 === currentPage}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </Pagination.Item>
        ))}
  
        <Pagination.Next onClick={goToNextPage} disabled={currentPage === totalPages}>
          Вперёд
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default PatientsList;