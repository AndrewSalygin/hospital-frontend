import { useState } from 'react';
import { addPatient } from '../../api/Patients';

const usePatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    insuranceInformation: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await addPatient(formData);
      return true;
    } catch (error) {
      setError('Ошибка при создании пациента. Попробуйте еще раз.');
      return false;
    }
  };

  return { formData, error, handleChange, handleGenderChange, handleSubmit };
};

export default usePatientForm;