import React from 'react';
import { Button, Container, Alert, Form, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useDoctors from '../../hooks/useDoctors';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import '../../styles/greenPagination.css';
import DoctorsTable from '../../components/Doctors/DoctorsTable';
import { useAuth } from '../../context/AuthContext';

const DoctorsList = ({ buttonName, buttonLink, isAdmin = false }) => {
  const {
    doctors,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteDoctor,
    loading,
    error
  } = useDoctors({ isAdmin });

  const navigate = useNavigate();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER-ADMIN';

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (doctorId) => {
    navigate(isAdmin ? `/admin/doctors/${doctorId}` : `/doctors/${doctorId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
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
          placeholder="Поиск по специализации..."
          name="specializationName"
          value={searchTerms.specializationName}
          onChange={handleSearchChange}
        />
      </Form>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {doctors.length === 0 ? (
        <Alert variant="info">Нет врачей</Alert>
      ) : (
        <>
          <DoctorsTable 
            doctors={doctors} 
            handleRowClick={handleRowClick} 
            handleDelete={handleDeleteDoctor} 
            isAdmin={isAdmin} 
          />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
      {isSuperAdmin && (
        <div className="col text-center">
          <Link to={buttonLink} style={{ textDecoration: 'none' }}>
            <Button variant="success" className="mt-3 mb-3">
              {buttonName}
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default DoctorsList;