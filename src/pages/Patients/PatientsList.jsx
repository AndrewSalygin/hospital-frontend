import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import usePatients from '../../hooks/usePatients';
import PatientSearchForm from '../../components/Patients/PatientSearchForm';
import PatientsTable from '../../components/Patients/PatientsTable';
import PaginationComponent from '../../components/Patients/PaginationComponent';
import '../../styles/greenPagination.css';

const PatientsList = ({ buttonName, buttonLink }) => {
  const {
    patients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage
  } = usePatients();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <Container className="mt-3">
      <PatientSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />
      <PatientsTable patients={patients} handleRowClick={handleRowClick} />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
      <div className="col text-center">
        <Link to={buttonLink} style={{ textDecoration: 'none' }}>
          <Button variant="success" className="mt-3 mb-3">
            {buttonName}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default PatientsList;