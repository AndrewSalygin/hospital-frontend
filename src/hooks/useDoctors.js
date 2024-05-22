import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const useDoctors = (specializationId) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!specializationId) return;

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`/specializations/doctors/${specializationId}`);
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось получить список врачей');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specializationId]);

  return { doctors, loading, error };
};

export default useDoctors;