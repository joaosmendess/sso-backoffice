import api from './apiClient';
import { LoginResponse, GetUserResponse } from '../types';

export const login = async (username: string, password: string, hash: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', { username, password, hash });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getUser = async (username: string): Promise<GetUserResponse> => {
  const response = await api.get<GetUserResponse>(`/auth/check-user/${username}`);
  return response.data;
};

export const checkUser = async ( username: string, hashCompany:string ): Promise<GetUserResponse> => {
  const response = await api.get<GetUserResponse>(`/check-user/${username}?hashCompany=${hashCompany}`);
  console.log(response);
  return response.data;
};

export const validateToken = async (token: string) => {
  const response = await api.post('/auth/validate-jwt', { token });
  return response.data;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post('/auth/verify', {}, { headers: { Authorization: `Bearer ${token}` } });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const sendEmailResetPassword = async (data: { email: string }) => {
  const response = await api.post('password/reset', data);
  return response.data;
};


export const setNewPassword = async (data: { token: string, password: string, password_confirmation: string }) => {
  const response = await api.post(`password/reset/confirm?token=${data.token}`, {
    password: data.password,
    password_confirmation: data.password_confirmation
  });
  return response.data; // Retorne a resposta completa
};
