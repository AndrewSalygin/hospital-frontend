import { useState, useEffect } from 'react';
import { getPatient, updatePatient } from '../api/Patients';

const usePatientData = (patientId, setPatient) => {
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInformation: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await getPatient(patientId);
        setFormData(patient);
        setPatient(patient);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId, setPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setFormData(prevState => ({ ...prevState, gender: e.target.value }));
  };

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      const updatedPatient = await updatePatient(patientId, formData);
      setPatient(updatedPatient);
      navigate(`/patients/${patientId}`);
    } catch (error) {
      setError('Ошибка при обновлении данных пациента. Попробуйте еще раз.');
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleGenderChange,
    handleSubmit
  };
};

export default usePatientData;