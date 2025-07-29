import api from '../api';

export const validateWithAuthToken = async () => {
  try {
    const response = await api.get('/admins/auth/validate/token');
    return response.status === 200;
  } catch (_err) {
    return false;
  }
};
