import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import usePatients from '../../hooks/usePatients';
import PatientSearchForm from '../../components/Patients/PatientSearchForm';
import PatientsTable from '../../components/Patients/PatientsTable';
import PaginationComponent from '../../components/Patients/PaginationComponent';
import LoadingSpinner from '../../components/LoadingSpinner';
import '../../styles/greenPagination.css';

const PatientsList = ({ buttonName, buttonLink, isAdmin = false }) => {
  const {
    patients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeletePatient,
    loading,
    error
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
    navigate(isAdmin ? `/admin/patients/${patientId}` : `/patients/${patientId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <PatientSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {patients.length === 0 ? (
        <Alert variant="info">Нет пациентов</Alert>
      ) : (
        <>
          <PatientsTable 
            patients={patients} 
            handleRowClick={handleRowClick} 
            handleDelete={handleDeletePatient} 
            isAdmin={isAdmin} 
          />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
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