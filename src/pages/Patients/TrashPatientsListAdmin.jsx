import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import usePatientData from '../../hooks/usePatients';
import LoadingSpinner from '../../components/LoadingSpinner';
import PatientSearchForm from '../../components/Patients/PatientSearchForm';
import TrashPatientsTable from '../../components/Patients/TrashPatientsTable';
import PaginationComponent from '../../components/Patients/PaginationComponent';
import '../../styles/greenPagination.css';

const TrashPatientsListAdmin = () => {
  const navigate = useNavigate();
  const {
    patients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleUnDeletePatient,
    loading,
    error
  } = usePatientData({ showDeleted: true, isAdmin: true });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (patientId) => {
    navigate(`/admin/patients/${patientId}`, { state: { fromTrash: true } });
  };

  const handleUnDelete = async (patientId) => {
    await handleUnDeletePatient(patientId);
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
        <Alert variant="info">Нет пациентов в архиве</Alert>
      ) : (
        <>
          <TrashPatientsTable
            patients={patients}
            handleRowClick={handleRowClick}
            handleUnDelete={handleUnDelete}
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