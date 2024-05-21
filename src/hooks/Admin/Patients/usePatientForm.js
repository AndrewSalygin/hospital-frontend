import { useState } from 'react';
import { addPatient } from '../../../api/Patients';

const usePatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInfo: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addPatient(formData);
      return true;
    } catch (error) {
      setError('Не удалось добавить пациента. Попробуйте еще раз.');
      return false;
    }
  };

  return {
    formData,
    error,
    handleChange,
    handleGenderChange,
    handleSubmit
  };
};

export default usePatientForm;