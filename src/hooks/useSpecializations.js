import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const useSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('/specializations');
        setSpecializations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось получить список специализаций');
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  return { specializations, loading, error };
};

export default useSpecializations;