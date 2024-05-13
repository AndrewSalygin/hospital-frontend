import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getPatients } from '../../api/Patients';
import '../../styles/greenPagination.css'

const PatientsList = ({ patients, setPatients, buttonName, buttonLink }) => {
  const [searchTerms, setSearchTerms] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: ''
  });
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const visiblePages = 5; // Number of pages to display

  useEffect(() => {
    const visiblePatients = patients.filter((patient) =>
      !patient.isDeleted &&
      Object.keys(searchTerms).every((key) =>
        searchTerms[key] === '' || 
        (patient[key] && patient[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase()))
      )
    );
    setFilteredPatients(visiblePatients);
  }, [searchTerms, patients]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  const handleRowClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients(-1, 0);
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="container mt-3">
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Поиск по фамилии..."
          name="lastName"
          value={searchTerms.lastName}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по имени..."
          name="firstName"
          value={searchTerms.firstName}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по отчеству..."
          name="middleName"
          value={searchTerms.middleName}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по дате рождения..."
          name="dateOfBirth"
          value={searchTerms.dateOfBirth}
          onChange={handleSearchChange}
          className="mb-2"
        />
      </Form>

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

      <Pagination className="pagination-success mt-3">
        <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1}>
          Назад
        </Pagination.Prev>
        {pages}
        <Pagination.Next onClick={goToNextPage} disabled={currentPage === totalPages}>
          Вперёд
        </Pagination.Next>
      </Pagination>
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

export default PatientsList;