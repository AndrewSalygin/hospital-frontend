import React, { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const usePatient = () => {
  return useContext(PatientContext);
};

export const PatientProvider = ({ children }) => {
  const [patient, setPatient] = useState(null);

  const value = {
    patient,
    setPatient,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};