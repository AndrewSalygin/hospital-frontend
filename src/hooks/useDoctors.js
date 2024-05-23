import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

// Универсальный хук для управления данными врачей и списком врачей
const useDoctors = ({
  doctorId = null,
  specializationId = null,
  setDoctor = null,
  limit = -1,
  offset = 0,
  showDeleted = false,
  isAdmin = false,
  isForm = false
} = {}) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    phoneNumber: '',
    emailAddress: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerms, setSearchTerms] = useState(() => {
    const savedTerms = localStorage.getItem('searchTerms');
    return savedTerms ? JSON.parse(savedTerms) : {
      lastName: '',
      firstName: '',
      middleName: '',
      specializationName: ''
    };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const doctorsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('searchTerms', JSON.stringify(searchTerms));
    const lowercasedTerms = {
      lastName: (searchTerms.lastName || '').toLowerCase(),
      firstName: (searchTerms.firstName || '').toLowerCase(),
      middleName: (searchTerms.middleName || '').toLowerCase(),
      specializationName: (searchTerms.specializationName || '').toLowerCase()
    };
    const visibleDoctors = doctors.filter(doctor => {
      return (
        (doctor.lastName || '').toLowerCase().includes(lowercasedTerms.lastName) &&
        (doctor.firstName || '').toLowerCase().includes(lowercasedTerms.firstName) &&
        (doctor.middleName || '').toLowerCase().includes(lowercasedTerms.middleName) &&
        (doctor.specializationName || '').toLowerCase().includes(lowercasedTerms.specializationName)
      );
    });
    setFilteredDoctors(visibleDoctors);
  }, [searchTerms, doctors]);

  // Получение данных конкретного врача с сервера
  useEffect(() => {
    if (doctorId) {
      const fetchDoctor = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/doctors/${doctorId}`);
          setFormData(response.data);
          if (setDoctor) setDoctor(response.data);
          setLoading(false);
        } catch (err) {
          setError('Не удалось получить данные врача');
          setLoading(false);
        }
      };
      fetchDoctor();
    } else {
      setLoading(false);
    }
  }, [doctorId, setDoctor]);

  // Получение списка врачей с сервера
  useEffect(() => {
    if (!doctorId && !isForm) {
      const fetchDoctors = async () => {
        setLoading(true);
        try {
          let response;
          if (specializationId) {
            response = await axios.get(`/specializations/doctors/${specializationId}`);
          } else {
            response = await axios.get('/doctors', { params: { limit, offset } });
          }
          setDoctors(response.data);
          setLoading(false);
        } catch (err) {
          setError('Не удалось получить список врачей');
          setLoading(false);
        }
      };
      fetchDoctors();
    }
  }, [limit, offset, doctorId, isForm, specializationId]);

  // Фильтрация списка врачей на основе условий поиска
  useEffect(() => {
    if (!doctorId && !isForm) {
      const visibleDoctors = doctors.filter(doctor =>
        (showDeleted ? doctor.isDeleted : !doctor.isDeleted) && // В зависимости от showDeleted фильтруем удаленных или активных врачей
        Object.keys(searchTerms).every(key =>
          searchTerms[key] === '' || // Если условие поиска пустое, принимаем все значения
          (doctor[key] && doctor[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase())) // Иначе проверяем совпадение
        )
      );
      setFilteredDoctors(visibleDoctors);
    }
  }, [searchTerms, doctors, showDeleted, doctorId, isForm]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик изменения пола врача
  const handleGenderChange = (e) => {
    setFormData(prevState => ({ ...prevState, gender: e.target.value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      if (doctorId) {
        const updatedDoctor = await axios.put(`/super-admin-doctors/${doctorId}`, formData);
        if (setDoctor) setDoctor(updatedDoctor.data);
        navigate(isAdmin ? `/admin/doctors/${doctorId}` : `/doctors/${doctorId}`);
      } else {
        await axios.post('/super-admin-doctors', formData);
        navigate(isAdmin ? '/admin/doctors' : '/doctors');
      }
    } catch (error) {
      setError('Не удалось сохранить данные врача');
    }
  };

  // Обработчик удаления врача (пометка как удаленный)
  const handleDeleteDoctor = async (doctorId) => {
    try {
      await axios.delete(`/super-admin-doctors/${doctorId}`);
      setDoctors(prevDoctors => prevDoctors.filter(doc => doc.doctorId !== doctorId));
    } catch (err) {
      setError('Не удалось удалить врача');
    }
  };

  const handleUnDeleteDoctor = async (doctorId) => {
    try {
      await axios.patch(`/super-admin-doctors/${doctorId}`);
      setDoctors(prevDoctors => prevDoctors.map(doc => {
        if (doc.doctorId === doctorId) {
          return { ...doc, isDeleted: false };
        }
        return doc;
      }));
    } catch (err) {
      setError('Не удалось восстановить врача');
    }
  };

  return {
    // Данные конкретного врача и обработчики формы
    formData,
    handleChange,
    handleGenderChange,
    handleSubmit,

    // Список врачей и связанные функции
    doctors: filteredDoctors.slice((currentPage - 1) * doctorsPerPage, currentPage * doctorsPerPage),
    searchTerms, // Условия поиска
    setSearchTerms, // Функция для обновления условий поиска
    currentPage, // Текущая страница
    totalPages: Math.ceil(filteredDoctors.length / doctorsPerPage), // Общее количество страниц
    setCurrentPage, // Функция для обновления текущей страницы
    handleDeleteDoctor, // Функция для удаления врача
    handleUnDeleteDoctor,
    setDoctors,
    setError,
    
    // Общее состояние
    loading, // Состояние загрузки данных
    error // Состояние ошибки
  };
};

export default useDoctors;
