import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useDoctorData from '../../hooks/useDoctors';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import DoctorSearchForm from '../../components/Doctors/DoctorSearchForm';
import DoctorsTable from '../../components/Doctors/DoctorsTable';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import '../../styles/greenPagination.css';

const TrashDoctorsListAdmin = () => {
  const navigate = useNavigate();
  const {
    doctors,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleUnDeleteDoctor,
    loading,
    error
  } = useDoctorData({ showDeleted: true, isAdmin: true });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (doctorId) => {
    navigate(`/admin/doctors/${doctorId}`, { state: { fromTrash: true } });
  };

  const handleUnDelete = async (doctorId) => {
    await handleUnDeleteDoctor(doctorId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <DoctorSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {doctors.length === 0 ? (
        <Alert variant="info">Нет врачей в архиве</Alert>
      ) : (
        <>
          <DoctorsTable
            doctors={doctors}
            handleRowClick={handleRowClick}
            handleUnDelete={handleUnDelete}
            isTrash={true}
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

export default TrashDoctorsListAdmin;
