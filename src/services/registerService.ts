import api from './apiClient';

export const register = async (name: string, username: string, invitationEmail: string, password: string, companyId: string) => {
  const response = await api.post('/auth/register', { name, username, invitationEmail, password, companyId: companyId });
  return response.data;
};

export const confirmRegistration = async (username: string, name: string, password: string, token: string) => {
  const response = await api.post('/confirm-registration', 
  { name, username, password }, 
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};