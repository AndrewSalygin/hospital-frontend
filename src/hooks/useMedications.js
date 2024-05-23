import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const useMedications = ({ limit = -1, offset = 0 } = {}) => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    medicationName: '',
    manufacturer: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/medications', {
          params: { limit, offset }
        });
        setMedications(response.data);
        const totalMedications = response.headers['x-total-count'] || response.data.length;
        setTotalPages(Math.ceil(totalMedications / limit));
        setLoading(false);
      } catch (error) {
        setError('Не удалось получить список медикаментов');
        setLoading(false);
      }
    };

    fetchMedications();
  }, [limit, offset]);

  useEffect(() => {
    const lowercasedTerms = {
      medicationName: (searchTerms.medicationName || '').toLowerCase(),
      manufacturer: (searchTerms.manufacturer || '').toLowerCase(),
    };
    const visibleMedications = medications.filter(med => {
      return (
        (med.medicationName || '').toLowerCase().includes(lowercasedTerms.medicationName) &&
        (med.manufacturer || '').toLowerCase().includes(lowercasedTerms.manufacturer)
      );
    });
    setFilteredMedications(visibleMedications);
  }, [searchTerms, medications]);

  return {
    medications: filteredMedications,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
    error
  };
};

export default useMedications;
