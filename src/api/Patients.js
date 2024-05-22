import axios from './axiosConfig';

const handleRequest = async (method, url, data = {}) => {
  try {
    const response = await axios({ method, url, ...data });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при выполнении запроса ${method.toUpperCase()} ${url}:`, error);
    throw error;
  }
};

// Добавить нового пациента на сервер
export const addPatient = (patientData) => handleRequest('post', '/admin-patients', { data: patientData });

// Обновить данные существующего пациента на сервере
export const updatePatient = (patientId, patientData) => handleRequest('put', `/admin-patients/${patientId}`, { data: patientData });

// Получить данные конкретного пациента по ID
export const getPatient = (patientId) => handleRequest('get', `/patients/${patientId}`);

// Получить список пациентов с параметрами лимита и смещения
export const getPatients = (limit, offset) => handleRequest('get', '/patients', { params: { limit, offset } });

// Удалить пациента (пометить как удаленного) на сервере
export const deletePatient = async (patientId) => {
  await handleRequest('patch', `/admin-patients/detach/${patientId}`);
};

// Удалить пациента навсегда на сервере
export const deleteForeverPatient = async (patientId) => {
  await handleRequest('delete', `/super-admin-patients/${patientId}`);
};

// Восстановить удаленного пациента на сервере
export const unDeletePatient = async (patientId) => {
  await handleRequest('patch', `/admin-patients/attach/${patientId}`);
};

// Обновить состояние пациента в локальном хранилище
export const updatePatientState = (patients, setPatients, updatedPatient) => {
  setPatients(patients.map(p => p.patientId === updatedPatient.patientId ? updatedPatient : p));
};

// Добавить нового пациента в локальное хранилище
export const addPatientState = (patients, setPatients, newPatient) => {
  const newPatientId = patients.length ? Math.max(...patients.map(p => p.patientId)) + 1 : 1;
  setPatients([...patients, { ...newPatient, patientId: newPatientId }]);
};

// Пометить пациента как удаленного в локальном хранилище
export const handleDeletePatientState = (patients, setPatients, patientId) => {
  setPatients(patients.map(patient => {
    if (patient.patientId === patientId) {
      return { ...patient, isDeleted: true };
    }
    return patient;
  }));
};

// Удалить пациента навсегда из локального хранилища
export const handleDeleteForeverPatientState = (patients, setPatients, patientId) => {
  setPatients(patients.filter(patient => patient.patientId !== patientId));
};

// Восстановить пациента из удаленных в локальном хранилище
export const handleUnDeletePatientState = (patients, setPatients, patientId) => {
  setPatients(patients.map(patient => {
    if (patient.patientId === patientId) {
      return { ...patient, isDeleted: false };
    }
    return patient;
  }));
};