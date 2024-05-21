import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import usePatientsAdmin from '../../../hooks/Admin/Patients/usePatientsAdmin'
import PatientSearchForm from '../../../components/Admin/Patients/PatientSearchForm';
import PatientsTable from '../../../components/Admin/Patients/PatientsTable';
import PaginationComponent from '../../../components/Admin/Patients/PaginationComponent';
import '../../../styles/greenPagination.css';

const PatientsListAdmin = ({ buttonName, buttonLink }) => {
  const {
    patients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeletePatient
  } = usePatientsAdmin();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (patientId) => {
    navigate(`/admin/patients/${patientId}`);
  };

  const handleDelete = (patientId) => {
    handleDeletePatient(patientId);
  };

  return (
    <Container className="mt-3">
      <PatientSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />
      <PatientsTable
        patients={patients}
        handleRowClick={handleRowClick}
        handleDelete={handleDelete}
      />
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

export default PatientsListAdmin;