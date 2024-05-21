import axios from './../api/axiosConfig';

export const updatePatient = (patients, setPatients, updatedPatient) => {
  setPatients(patients.map(p => p.patientId === updatedPatient.patientId ? updatedPatient : p));
};

export const addPatient = (patients, setPatients, newPatient) => {
  const newPatientId = patients.length ? Math.max(...patients.map(p => p.patientId)) + 1 : 1;
  setPatients([...patients, { ...newPatient, patientId: newPatientId }]);
};

export const deletePatient = async (patients, setPatients, patientId) => {
  try {
    await axios.patch(`/admin-patients/detach/${patientId}`);
    setPatients(patients.map(patient => {
      if (patient.patientId === patientId) {
        return { ...patient, isDeleted: true };
      }
      return patient;
    }));
  } catch (error) {
    console.error('Failed to delete patient:', error);
  }
};

export const deleteForeverPatient = async (patients, setPatients, patientId) => {
  try {
    await axios.delete(`/super-admin-patients/${patientId}`);
    setPatients(patients.filter(patient => patient.patientId !== patientId));
  } catch (error) {
    console.error('Failed to delete patient forever:', error);
  }
};

export const unDeletePatient = async (patients, setPatients, patientId) => {
  try {
    await axios.patch(`/admin-patients/attach/${patientId}`);
    setPatients(patients.map(patient => {
      if (patient.patientId === patientId) {
        return { ...patient, isDeleted: false };
      }
      return patient;
    }));
  } catch (error) {
    console.error('Failed to undelete patient:', error);
  }
};