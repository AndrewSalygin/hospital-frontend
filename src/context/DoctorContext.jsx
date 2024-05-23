import React, { createContext, useContext, useState } from 'react';

const DoctorContext = createContext();

export const useDoctor = () => {
  return useContext(DoctorContext);
};

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);

  const value = {
    doctor,
    setDoctor,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};
