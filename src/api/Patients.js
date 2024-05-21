import axios from './axiosConfig';

export const addPatient = async (patientData) => {
  try {
    await axios.post(`/admin-patients`, patientData);
  } catch (error) {
    console.error('Ошибка при добавлении пациента:', error);
    throw error;
  }
};

export const updatePatient = async (patientId, patientData) => {
  try {
    const response = await axios.put(`/admin-patients/${patientId}`, patientData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении данных пациента:', error);
    throw error;
  }
};

export const getPatient = async (patientId) => {
  try {
    const response = await axios.get(`/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении пациента:', error);
    throw error;
  }
};

export const getPatients = async (limit, offset) => {
  try {
    const response = await axios.get('/patients', {
      params: {
        limit: limit,
        offset: offset
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных пациентов:', error);
    throw error;
  }
};