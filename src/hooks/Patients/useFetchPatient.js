import { useState, useEffect } from 'react';
import { getPatient } from '../../api/Patients';

const useFetchPatient = (patientId, setPatient) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatient(patientId);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patient:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId, setPatient]);

  return { loading, error };
};

export default useFetchPatient;