import React from 'react';
import { Button, Container, Alert, Form, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import usePatientMeetings from '../../hooks/usePatientMeetings';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import '../../styles/greenPagination.css';

const PatientMeetingsList = ({ isAdmin = false }) => {
  const { patientId } = useParams();
  const {
    meetings,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteMeeting,
    loading,
    error,
    doctors,
  } = usePatientMeetings({ isAdmin, patientId });

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value,
    }));
  };

  const handleRowClick = (noteId) => {
    const notePath = isAdmin
      ? `/admin/patients/${patientId}/notes/${noteId}`
      : `/patients/${patientId}/notes/${noteId}`;
    navigate(notePath);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const backLink = isAdmin ? `/admin/patients/${patientId}` : `/patients/${patientId}`;

  return (
    <Container className="mt-3">
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Поиск по статусу пациента..."
          name="patientStatus"
          value={searchTerms.patientStatus}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по имени доктора..."
          name="doctorName"
          value={searchTerms.doctorName}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="date"
          placeholder="Поиск по дате приёма..."
          name="admissionDate"
          value={searchTerms.admissionDate}
          onChange={handleSearchChange}
        />
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {meetings.length === 0 ? (
        <Alert variant="info">Нет записей для этого пациента</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Дата и время приёма</th>
                <th>Статус пациента</th>
                <th>Первичный приём</th>
                <th>Выписка</th>
                <th>Доктор</th>
                <th>Номер телефона доктора</th>
                {isAdmin && <th>Действия</th>}
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr
                  key={meeting.medicalHistoryNoteId}
                  onClick={() => handleRowClick(meeting.medicalHistoryNoteId)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{(currentPage - 1) * 5 + index + 1}</td>
                  <td>{new Date(meeting.admissionDateTime).toLocaleString()}</td>
                  <td>{meeting.patientStatus}</td>
                  <td>{meeting.initialAdmission ? 'Да' : 'Нет'}</td>
                  <td>{meeting.discharge ? 'Да' : 'Нет'}</td>
                  <td>{doctors[meeting.doctorId] ? `${doctors[meeting.doctorId].lastName} ${doctors[meeting.doctorId].firstName} ${doctors[meeting.doctorId].middleName}` : 'Загрузка...'}</td>
                  <td>{doctors[meeting.doctorId] ? doctors[meeting.doctorId].phoneNumber : 'Загрузка...'}</td>
                  {isAdmin && (
                    <td>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMeeting(meeting.medicalHistoryNoteId);
                        }}
                      >
                        Удалить
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={setCurrentPage}
            />
          )}
        </>
      )}
      <div className="col text-center">
        <Button variant="secondary" className="mt-3 mb-3" onClick={() => navigate(backLink)}>
          Вернуться назад
        </Button>
      </div>
    </Container>
  );
};

export default PatientMeetingsList;
