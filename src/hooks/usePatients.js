import { useState, useEffect } from 'react';
import {
  getPatient,
  updatePatient,
  getPatients,
  deletePatient,
  deleteForeverPatient,
  unDeletePatient,
  addPatient,
  handleDeletePatientState,
  handleDeleteForeverPatientState,
  handleUnDeletePatientState
} from '../api/Patients';

// Универсальный хук для управления данными пациента и списком пациентов
const usePatients = ({
  patientId = null,
  setPatient = null,
  limit = -1,
  offset = 0,
  showDeleted = false,
  isAdmin = false,
  isForm = false
} = {}) => {
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
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const patientsPerPage = 5;

  // Получение данных конкретного пациента с сервера
  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        setLoading(true);
        try {
          const patient = await getPatient(patientId);
          setFormData(patient);
          if (setPatient) setPatient(patient);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить данные пациента');
          setLoading(false);
        }
      };
      fetchPatient();
    } else {
      setLoading(false);
    }
  }, [patientId, setPatient]);

  // Получение списка пациентов с сервера
  useEffect(() => {
    if (!patientId && !isForm) {
      const fetchPatients = async () => {
        setLoading(true);
        try {
          const data = await getPatients(limit, offset);
          setPatients(data);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить список пациентов');
          setLoading(false);
        }
      };
      fetchPatients();
    }
  }, [limit, offset, patientId, isForm]);

  // Фильтрация списка пациентов на основе условий поиска
  useEffect(() => {
    if (!patientId && !isForm) {
      const visiblePatients = patients.filter(patient =>
        (showDeleted ? patient.isDeleted : !patient.isDeleted) && // В зависимости от showDeleted фильтруем удаленных или активных пациентов
        Object.keys(searchTerms).every(key =>
          searchTerms[key] === '' || // Если условие поиска пустое, принимаем все значения
          (patient[key] && patient[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase())) // Иначе проверяем совпадение
        )
      );
      setFilteredPatients(visiblePatients);
    }
  }, [searchTerms, patients, showDeleted, patientId, isForm]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик изменения пола пациента
  const handleGenderChange = (e) => {
    setFormData(prevState => ({ ...prevState, gender: e.target.value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      if (patientId) {
        const updatedPatient = await updatePatient(patientId, formData);
        if (setPatient) setPatient(updatedPatient);
        navigate(isAdmin ? `/admin/patients/${patientId}` : `/patients/${patientId}`);
      } else {
        await addPatient(formData);
        navigate(isAdmin ? '/admin/patients' : '/patients');
      }
    } catch (error) {
      setError('Не удалось сохранить данные пациента');
    }
  };

  // Обработчик удаления пациента (пометка как удаленный)
  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(patientId); // Удаляем пациента на сервере
      handleDeletePatientState(patients, setPatients, patientId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось удалить пациента');
    }
  };

  // Обработчик полного удаления пациента
  const handleDeleteForeverPatient = async (patientId) => {
    try {
      await deleteForeverPatient(patientId); // Полностью удаляем пациента на сервере
      handleDeleteForeverPatientState(patients, setPatients, patientId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось навсегда удалить пациента');
    }
  };

  // Обработчик восстановления удаленного пациента
  const handleUnDeletePatient = async (patientId) => {
    try {
      await unDeletePatient(patientId); // Восстанавливаем пациента на сервере
      handleUnDeletePatientState(patients, setPatients, patientId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось восстановить пациента');
    }
  };

  return {
    // Данные конкретного пациента и обработчики формы
    formData,
    handleChange,
    handleGenderChange,
    handleSubmit,

    // Список пациентов и связанные функции
    patients: filteredPatients.slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage),
    searchTerms, // Условия поиска
    setSearchTerms, // Функция для обновления условий поиска
    currentPage, // Текущая страница
    totalPages: Math.ceil(filteredPatients.length / patientsPerPage), // Общее количество страниц
    setCurrentPage, // Функция для обновления текущей страницы
    handleDeletePatient, // Функция для удаления пациента
    handleDeleteForeverPatient, // Функция для полного удаления пациента
    handleUnDeletePatient, // Функция для восстановления пациента

    // Общее состояние
    loading, // Состояние загрузки данных
    error // Состояние ошибки
  };
};

export default usePatients;