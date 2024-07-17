import api from './apiClient';
import { Module } from '../types';

export const fetchModules = async (): Promise<Module[]> => {
  const response = await api.get('/modules');
  return response.data;
};

export const createModule = async (name: string, company_id: number) => {
  const response = await api.post('/modules', { name, company_id });
  return response.data;
};

export const updateModule = async (id: string, name: string, company_id: number) => {
  const response = await api.put(`/modules/${id}`, { name, company_id });
  return response.data;
};

export const deleteModule = async (id: string) => {
  const response = await api.delete(`/modules/${id}`);
  return response.data;
};
