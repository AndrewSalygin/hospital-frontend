import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const usePatientMeetings = ({ patientId, isAdmin = false }) => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    patientStatus: '',
    doctorName: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({});
  const meetingsPerPage = 5;

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/patients/meeting/${patientId}`, {
        params: {
          limit: -1, // Fetch all records to filter them properly
          offset: 0,
        },
      });
      const fetchedMeetings = response.data.filter(meeting => !meeting.isDeleted);

      const doctorIds = [...new Set(fetchedMeetings.map(meeting => meeting.doctorId))];
      const doctorsResponse = await Promise.all(doctorIds.map(id => axios.get(`/doctors/${id}`)));
      const doctorsData = doctorsResponse.reduce((acc, response) => {
        acc[response.data.doctorId] = response.data;
        return acc;
      }, {});
      setDoctors(doctorsData);

      setMeetings(fetchedMeetings);
    } catch (error) {
      setError('Не удалось получить список приёмов пациента');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [patientId]);

  useEffect(() => {
    const lowercasedTerms = {
      patientStatus: (searchTerms.patientStatus || '').toLowerCase(),
      doctorName: (searchTerms.doctorName || '').toLowerCase()
    };
    const visibleMeetings = meetings.filter(meeting => {
      const doctor = doctors[meeting.doctorId] || {};
      const doctorName = `${doctor.firstName || ''} ${doctor.lastName || ''} ${doctor.middleName || ''}`.toLowerCase();
      return (
        (meeting.patientStatus || '').toLowerCase().includes(lowercasedTerms.patientStatus) &&
        doctorName.includes(lowercasedTerms.doctorName)
      );
    });

    setFilteredMeetings(visibleMeetings);
    setTotalPages(Math.ceil(visibleMeetings.length / meetingsPerPage));
  }, [searchTerms, meetings, doctors]);

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`/admin-journal-patient/${meetingId}`);
      fetchMeetings();
    } catch (error) {
      console.error('Не удалось удалить запись', error);
    }
  };

  return {
    meetings: filteredMeetings.slice((currentPage - 1) * meetingsPerPage, currentPage * meetingsPerPage),
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteMeeting,
    loading,
    error,
    doctors,
  };
};

export default usePatientMeetings;
