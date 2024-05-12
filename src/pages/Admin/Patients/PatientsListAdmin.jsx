import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/greenPagination.css';

const PatientsListAdmin = ({ patients, deletePatient, buttonName, buttonLink }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const visiblePages = 5;

  // Update filtered patients based on search term
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const visiblePatients = patients.filter(
      (patient) =>
        !patient.isDeleted &&
        Object.values(patient).join(' ').toLowerCase().includes(lowercasedTerm)
    );
    setFilteredPatients(visiblePatients);
  }, [searchTerm, patients]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  // Navigate to patient details on row click
  const handleRowClick = (patientId) => {
    navigate(`/admin/patients/${patientId}`);
  };

  // Pagination controls
  const goToPreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  // Determine the range of page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  // Create a range of page numbers to render
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Button click handler for deleting a patient
  const handleDelete = (patientId) => {
    deletePatient(patientId);
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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient, index) => (
            <tr key={patient.patientId}>
              <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>
                {indexOfFirstPatient + index + 1}
              </td>
              <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>
                {patient.lastName}
              </td>
              <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>
                {patient.firstName}
              </td>
              <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>
                {patient.middleName}
              </td>
              <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>
                {patient.gender}
              </td>
              <td onClick={() => handleRowClick(patient.patientId)} style={{ cursor: 'pointer' }}>
                {patient.dateOfBirth}
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(patient.patientId)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <Pagination className="pagination-success mt-3">
        <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1}>
          Назад
        </Pagination.Prev>
        {pages}
        <Pagination.Next onClick={goToNextPage} disabled={currentPage === totalPages}>
          Вперёд
        </Pagination.Next>
      </Pagination>

      {/* Add Patient Button */}
      <div className="col text-center">
        <Link to={buttonLink} style={{ textDecoration: 'none' }}>
          <Button variant="success" className="mt-3 mb-3">
            {buttonName}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PatientsListAdmin;