import api from './apiClient';

export const register = async (name: string, username: string, invitationEmail: string, password: string, companyId: string) => {
  const response = await api.post('/register', { name, username, invitationEmail, password, company_id: companyId });
  return response.data;
};
