import { useState, useEffect } from 'react';
import { getPatient, updatePatient } from '../../../api/Patients';

const usePatientData = (patientId, setPatient) => {
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInfo: ''
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
        setError('Failed to fetch patient data');
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId, setPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setFormData(prevData => ({ ...prevData, gender: e.target.value }));
  };

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      await updatePatient(patientId, formData);
      navigate(`/admin/patients/${patientId}`);
    } catch (error) {
      setError('Failed to update patient data');
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