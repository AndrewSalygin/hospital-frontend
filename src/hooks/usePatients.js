import { useState, useEffect } from 'react';
import { getPatients } from '../api/Patients';
import { deletePatient, deleteForeverPatient, unDeletePatient } from '../scripts/PatientsScripts';

const usePatients = (limit = -1, offset = 0) => {
  const [patients, setPatients] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: ''
  });
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients(limit, offset);
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };
    fetchPatients();
  }, [limit, offset]);

  useEffect(() => {
    const visiblePatients = patients.filter(patient =>
      !patient.isDeleted &&
      Object.keys(searchTerms).every(key =>
        searchTerms[key] === '' ||
        (patient[key] && patient[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase()))
      )
    );
    setFilteredPatients(visiblePatients);
  }, [searchTerms, patients]);

  const handleDeletePatient = (patientId) => {
    deletePatient(patients, setPatients, patientId);
  };

  const handleDeleteForeverPatient = (patientId) => {
    deleteForeverPatient(patients, setPatients, patientId);
  };

  const handleUnDeletePatient = (patientId) => {
    unDeletePatient(patients, setPatients, patientId);
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
    handleUnDeletePatient
  };
};

export default usePatients;