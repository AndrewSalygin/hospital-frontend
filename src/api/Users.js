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

// Получить список пользователей
export const getUsers = () => handleRequest('get', '/super-admin-users');

// Удалить пользователя на сервере
export const deleteUser = async (userId) => {
  await handleRequest('delete', `/super-admin-users/${userId}`);
};

// Изменить права пользователя на сервере
export const changeUserRights = async (userId, newRole) => {
  await handleRequest('post', `/super-admin-users/userRights/${userId}`, { data: { role: newRole } });
};