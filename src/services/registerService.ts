import api from './apiClient';

export const register = async (name: string, username: string, invitationEmail: string, password: string, companyId: string) => {
  const response = await api.post('/auth/register', { name, username, invitationEmail, password, companyId: companyId });
  return response.data;
};


export const confirmRegistration = async (token: string) => {
  const response = await api.post('/confirm-registration', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};