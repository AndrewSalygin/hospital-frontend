import { useState, useEffect } from 'react';
import { getPatients } from '../../../api/Patients';
import { deletePatient, deleteForeverPatient, unDeletePatient } from '../../../scripts/PatientsScripts';

const usePatients = (limit = -1, offset = 0) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const patientsPerPage = 5;

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await getPatients(limit, offset);
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [limit, offset]);

  useEffect(() => {
    const visiblePatients = patients.filter(patient =>
      patient.isDeleted && // Фильтруем только удаленных пациентов
      Object.keys(searchTerms).every(key =>
        searchTerms[key] === '' ||
        (patient[key] && patient[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase()))
      )
    );
    setFilteredPatients(visiblePatients);
  }, [searchTerms, patients]);

  const handleDeletePatient = async (patientId) => {
    await deletePatient(patients, setPatients, patientId);
  };

  const handleDeleteForeverPatient = async (patientId) => {
    await deleteForeverPatient(patients, setPatients, patientId);
  };

  const handleUnDeletePatient = async (patientId) => {
    await unDeletePatient(patients, setPatients, patientId);
  };

  return {
    patients: filteredPatients.slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage),
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages: Math.ceil(filteredPatients.length / patientsPerPage),
    setCurrentPage,
    handleDeletePatient,
    handleDeleteForeverPatient,
    handleUnDeletePatient,
    loading
  };
};

export default usePatients;