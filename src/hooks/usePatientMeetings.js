import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const usePatientMeetings = ({ isAdmin, patientId }) => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    patientStatus: '',
    doctorName: '',
    admissionDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({});
  const meetingsPerPage = 5;

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`/patients/meeting/${patientId}`, {
          params: { limit: -1, offset: 0 }
        });
        const fetchedMeetings = response.data.filter(meeting => !meeting.isDeleted);
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

  useEffect(() => {
    const lowercasedTerms = {
      patientStatus: (searchTerms.patientStatus || '').toLowerCase(),
      doctorName: (searchTerms.doctorName || '').toLowerCase(),
      admissionDate: searchTerms.admissionDate,
    };

    const visibleMeetings = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.admissionDateTime).toISOString().split('T')[0];
      return (
        (meeting.patientStatus || '').toLowerCase().includes(lowercasedTerms.patientStatus) &&
        (doctors[meeting.doctorId] && (
          `${doctors[meeting.doctorId].firstName} ${doctors[meeting.doctorId].lastName}`.toLowerCase().includes(lowercasedTerms.doctorName) ||
          `${doctors[meeting.doctorId].lastName} ${doctors[meeting.doctorId].firstName}`.toLowerCase().includes(lowercasedTerms.doctorName)
        )) &&
        (lowercasedTerms.admissionDate === '' || meetingDate === lowercasedTerms.admissionDate)
      );
    });
    setFilteredMeetings(visibleMeetings);
  }, [searchTerms, meetings, doctors]);

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`/admin-journal-patient/${meetingId}`);
      setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.medicalHistoryNoteId !== meetingId));
    } catch (error) {
      setError('Не удалось удалить запись');
    }
  };

  return {
    meetings: filteredMeetings.slice((currentPage - 1) * meetingsPerPage, currentPage * meetingsPerPage),
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages: Math.ceil(filteredMeetings.length / meetingsPerPage),
    setCurrentPage,
    handleDeleteMeeting,
    loading,
    error,
    doctors,
  };
};

export default usePatientMeetings;
