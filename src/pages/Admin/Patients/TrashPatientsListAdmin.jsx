import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import usePatients from '../../../hooks/Admin/TrashPatients/usePatients';
import LoadingSpinner from './../../../components/LoadingSpinner';
import PatientSearchForm from '../../../components/Admin/Patients/PatientSearchForm';
import PatientsTable from '../../../components/Admin/Patients/PatientsTable';
import PaginationComponent from '../../../components/Admin/Patients/PaginationComponent';
import '../../../styles/greenPagination.css';

const TrashPatientsListAdmin = () => {
  const navigate = useNavigate();
  const {
    patients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeletePatient,
    handleDeleteForeverPatient,
    handleUnDeletePatient,
    loading
  } = usePatients();

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <PatientSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />

      {patients.length === 0 ? (
        <Alert variant="info">Нет пациентов в архиве</Alert>
      ) : (
        <>
          <PatientsTable
            patients={patients}
            handleRowClick={handleRowClick}
            handleUnDelete={handleUnDeletePatient}
            handleDelete={handleDeleteForeverPatient}
          />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};

export default TrashPatientsListAdmin;