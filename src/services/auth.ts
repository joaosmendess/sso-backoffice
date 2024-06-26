import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8989/api',
});
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login?expired=true';
    }
    return Promise.reject(error);
  }
);

interface LoginResponse {
  message: string;
  token: string;
  customerData: {
    name: string;
    userName: string;
    empresa: string;
    permissions: Array<{
      application: {
        name: string;
        description: string;
        developUrl: string;
        homologUrl: string;
        productionUrl: string;
      };
      modules: Array<{
        name: string;
        get: number;
        post: number;
        put: number;
        delete: number;
      }>;
    }>;
  };
}

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', { userName, password });
  return response.data;
};


export const createUser = async (name: string, userName: string, permissionGroup: string) => {
  const response = await api.post('/users', { name, userName, permissionGroup });
  return response.data;
};

export const fetchPermissionGroups = async () => {
  const response = await api.get('/permissions-groups');
  return response.data;
};

export const createPermissionGroup = async (name: string, permissions: { get: number, post: number, put: number, delete: number }, modules_id: number, empresa_id: number) => {
  const response = await api.post('/permissions-groups', { name, ...permissions, modules_id, empresa_id });
  return response.data;
};

export const updatePermissionGroup = async (id: string, name: string, permissions: { get: number, post: number, put: number, delete: number }) => {
  const response = await api.put(`/permissions-groups/${id}`, { name, ...permissions });
  return response.data;
};

export const deletePermissionGroup = async (id: string) => {
  const response = await api.delete(`/permissions-groups/${id}`);
  return response.data;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post('/auth/login', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
