import api from './apiClient';
import { Company } from '../types';

/**
 * Obtém os dados da empresa pública.
 * @param {string} hash - Tag da empresa.
 * @returns {Promise<any>} - Dados da empresa.
 */
export const getPublicCompany = async (hash: string) => {
  const response = await api.get(`/public-company/${hash}`);
  return response.data;
};

/**
 * Obtém os dados da empresa.
 * @returns {Promise<any>} - Dados da empresa.
 */
export const getCompany = async () => {
  const response = await api.get('/company');
  return response.data.data;
};


/**
 * Atualiza os dados da empresa.
 * @param {number} id - ID da empresa.
 * @param {Partial<Company>} data - Dados a serem atualizados.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updateCompany = async (id: number, data: Partial<Company>) => {
  const response = await api.put(`/company/${id}`, data);
  return response.data;
};

/**
 * Deleta a empresa.
 * @param {number} id - ID da empresa.
 * @returns {Promise<any>} - Resposta da API.
 */
export const deleteCompany = async (id: number) => {
  const response = await api.delete(`/company/${id}`);
  return response.data;
};


/**
 * Retorna nome e tag da empresa
 * @param {number} id - ID da empresa
 * @returns {Promise<any>} - Resposta da API.
 */
export const getPublicCompanyId = async (id:number) => {
  const response = await api.get(`/public-companyId/${id}`);
  return response.data
} 