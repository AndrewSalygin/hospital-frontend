import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Alert, Spinner, Button } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

const PatientMeetingsList = ({ isAdmin = false }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`/patients/meeting/${patientId}`, {
          params: { limit: -1, offset: 0 }
        });
        const fetchedMeetings = response.data;
        setMeetings(fetchedMeetings);

        const doctorIds = [...new Set(fetchedMeetings.map(meeting => meeting.doctorId))];
        const doctorsResponse = await Promise.all(doctorIds.map(id => axios.get(`/doctors/${id}`)));
        const doctorsData = doctorsResponse.reduce((acc, response) => {
          acc[response.data.doctorId] = response.data;
          return acc;
        }, {});
        setDoctors(doctorsData);
      } catch (error) {
        setError('Не удалось получить список приёмов пациента');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [patientId]);

  const handleRowClick = (noteId) => {
    const notePath = isAdmin 
      ? `/admin/patients/${patientId}/notes/${noteId}`
      : `/patients/${patientId}/notes/${noteId}`;
    navigate(notePath);
  };

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const backLink = isAdmin ? `/admin/patients/${patientId}` : `/patients/${patientId}`;

  return (
    <Container className="mt-5">
      <h2>Записи пациента</h2>
      <Button variant="secondary" onClick={() => navigate(backLink)} className="mb-3">
        Вернуться назад
      </Button>
      {meetings.length === 0 ? (
        <Alert variant="info">Нет записей для этого пациента</Alert>
      ) : (
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
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr key={meeting.medicalHistoryNoteId} onClick={() => handleRowClick(meeting.medicalHistoryNoteId)} style={{ cursor: 'pointer' }}>
                <td>{index + 1}</td>
                <td>{new Date(meeting.admissionDateTime).toLocaleString()}</td>
                <td>{meeting.patientStatus}</td>
                <td>{meeting.initialAdmission ? 'Да' : 'Нет'}</td>
                <td>{meeting.discharge ? 'Да' : 'Нет'}</td>
                <td>{doctors[meeting.doctorId] ? `${doctors[meeting.doctorId].lastName} ${doctors[meeting.doctorId].firstName} ${doctors[meeting.doctorId].middleName}` : 'Загрузка...'}</td>
                <td>{doctors[meeting.doctorId] ? doctors[meeting.doctorId].phoneNumber : 'Загрузка...'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PatientMeetingsList;