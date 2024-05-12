export const updatePatient = (patients, setPatients, updatedPatient) => {
    setPatients(patients.map(p => p.patientId === updatedPatient.patientId ? updatedPatient : p));
};

export const addPatient = (patients, setPatients, newPatient) => {
    const newPatientId = patients.length ? Math.max(...patients.map(p => p.patientId)) + 1 : 1;
    setPatients([...patients, { ...newPatient, patientId: newPatientId }]);
};

export const deletePatient = (patients, setPatients, patientId) => {
    setPatients(patients.map(patient => {
        if (patient.patientId === patientId) {
          return { ...patient, isDeleted: true };
        }
        return patient;
    }));
};

export const deleteForeverPatient = (patients, setPatients, patientId) => {
    setPatients(patients.filter(patient => patient.patientId !== patientId));
};

export const unDeletePatient = (patients, setPatients, patientId) => {
    setPatients(patients.map(patient => {
        if (patient.patientId === patientId) {
          return { ...patient, isDeleted: false };
        }
        return patient;
    }));
};