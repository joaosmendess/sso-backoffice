import axios from "axios";
import {
  Permission,
  User,
  Module,
  LoginResponse,
  PermissionGroup,
  PermissionGroupHasModule,
  UserHasPermission,
  Application,
  GetUserResponse,
} from "../types";

const api = axios.create({
  baseURL: "http://10.1.1.151:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login?expired=true";
    }
    return Promise.reject(error);
  }
);

/**
 * Realiza o login do usuário.
 * @param {string} username- Nome de usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<LoginResponse>} - Resposta da API com o token e dados do cliente.
 */
export const login = async (
  username: string,
  password: string,
  tag: string,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
    tag,
  });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await api.post('/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

/**
 * Obtém os dados do usuário.
 * @param {string} username- Nome de usuário.
 * @returns {Promise<GetUserResponse>} - Dados do usuário.
 */
export const getUser = async (username: string): Promise<GetUserResponse> => {
  const response = await api.get<GetUserResponse>(`/check-user/${username}`);
  console.log(response);
  return response.data;
};

/**
 * Cria um novo usuário.
 * @param {string} name - Nome do usuário.
 * @param {string} username- Nome de usuário.
 * @param {string} permissionGroup - Grupo de permissões do usuário.
 * @returns {Promise<any>} - Resposta da API.
 */
export const createUser = async (
  name: string,
  username: string,
  permissionGroup: string
) => {
  const response = await api.post("/users", {
    name,
    username,
    permissionGroup,
  });
  return response.data;
};

/**
 * Busca a lista de usuários.
 * @param {string} [name] - Nome do usuário para filtro opcional.
 * @param {string} [username] - Nome de usuário para filtro opcional.
 * @returns {Promise<User[]>} - Lista de usuários.
 */
export const fetchUsers = async (
  name?: string,
  username?: string
): Promise<User[]> => {
  const response = await api.get("/users", {
    params: { name, username },
  });
  return response.data;
};

/**
 * Registra um novo usuário.
 * @param {string} name - Nome do usuário.
 * @param {string} username- Nome de usuário.
 * @param {string} invitationEmail - Email de convite.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<any>} - Resposta da API.
 */
export const register = async (
  name: string,
  username: string,
  invitationEmail: string,
  password: string,
  companyId: string,
) => {
  try {
    const response = await api.post('/register', {
      name,
      username,
      invitationEmail,
      password,
      company_id: companyId, // Captura o ID da company obtido na resposta da API
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};


export const getPublicCompany = async (tag: string) => {
  try {
    const response = await api.get(`/public-company/${tag}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching public company:', error);
    throw error;
  }
};


/**
 * Busca os grupos de permissões.
 * @returns {Promise<PermissionGroup[]>} - Lista de grupos de permissões.
 */
export const fetchPermissionGroups = async (): Promise<PermissionGroup[]> => {
  const response = await api.get("/permissions-groups");
  return response.data;
};

/**
 * Atualiza o grupo de permissões do usuário.
 * @param {number} userId - ID do usuário.
 * @param {string} permissionGroup - Novo grupo de permissões.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updateUserPermissionGroup = async (
  userId: number,
  permissionGroup: string
) => {
  const response = await api.put(`/users/${userId}/permissions`, {
    permissionGroup,
  });
  return response.data;
};

/**
 * Busca todos os módulos.
 * @returns {Promise<Module[]>} - Lista de módulos.
 */
export const fetchModules = async (): Promise<Module[]> => {
  const response = await api.get("/modules");
  return response.data;
};

/**
 * Cria um novo grupo de permissões.
 * @param {Object} group - Dados do grupo de permissões.
 * @param {string} group.name - Nome do grupo.
 * @returns {Promise<any>} - Resposta da API.
 */
export const createPermissionGroup = async (group: { name: string }) => {
  const response = await api.post("/permissions-groups", group);
  return response.data;
};

export const getCompany = async () => {
  try {
    const response = await api.get('/company');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};
/**
 * Atualiza um grupo de permissões.
 * @param {string} id - ID do grupo de permissões.
 * @param {Permission} permissions - Permissões do grupo.
 * @param {string} name - Nome do grupo.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updatePermissionGroup = async (
  id: string,
  permissions: Permission,
  name: string
) => {
  const response = await api.put(`/permissions-groups/${id}`, {
    name,
    permissions,
  });
  return response.data;
};

/**
 * Deleta um grupo de permissões.
 * @param {string} id - ID do grupo de permissões.
 * @returns {Promise<any>} - Resposta da API.
 */
export const deletePermissionGroup = async (id: string) => {
  const response = await api.delete(`/permissions-groups/${id}`);
  return response.data;
};

/**
 * Cria um novo módulo.
 * @param {string} name - Nome do módulo.
 * @param {number} companyId- ID da company.
 * @returns {Promise<any>} - Resposta da API.
 */
export const createModule = async (name: string, company_id: number) => {
  const response = await api.post("/modules", { name, companyId});
  return response.data;
};

/**
 * Atualiza um módulo.
 * @param {string} id - ID do módulo.
 * @param {string} name - Nome do módulo.
 * @param {number} companyId- ID da company.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updateModule = async (
  id: string,
  name: string,
  company_id: number
) => {
  const response = await api.put(`/modules/${id}`, { name, companyId});
  return response.data;
};

/**
 * Deleta um módulo.
 * @param {string} id - ID do módulo.
 * @returns {Promise<any>} - Resposta da API.
 */
export const deleteModule = async (id: string) => {
  const response = await api.delete(`/modules/${id}`);
  return response.data;
};

/**
 * Valida um token JWT.
 * @param {string} token - Token JWT a ser validado.
 * @returns {Promise<any>} - Resposta da API com o resultado da validação.
 */
export const validateToken = async (token: string) => {
  const response = await axios.post(
    "http://localhost:8989/auth/validate-jwt",
    { token }
  );
  return response.data;
};

/**
 * Verifica a validade de um token JWT.
 * @param {string} token - Token JWT a ser verificado.
 * @returns {Promise<boolean>} - `true` se o token for válido, caso contrário `false`.
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post(
      "/auth/verify",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

/**
 * Busca os módulos associados a um grupo de permissões.
 * @param {number} groupId - ID do grupo de permissões.
 * @returns {Promise<PermissionGroupHasModule>} - Dados dos módulos associados.
 */
export const fetchPermissionGroupsHasModule = async (
  groupId: number
): Promise<PermissionGroupHasModule> => {
  const response = await api.get<PermissionGroupHasModule>(
    `/permissions-groups-has-modules/${groupId}`
  );
  return response.data;
};

/**
 * Busca as permissões dos usuários.
 * @returns {Promise<UserHasPermission[]>} - Lista de permissões dos usuários.
 */
export const fetchUserHasPermissions = async (): Promise<UserHasPermission[]> => {
  const response = await api.get("/user-has-permissions");
  return response.data;
};

/**
 * Cria uma associação entre um grupo de permissões e um módulo.
 * @param {PermissionGroupHasModule} permissions - Dados da associação.
 * @returns {Promise<any>} - Resposta da API.
 */
export const createPermissionGroupHasModule = async (
  permissions: PermissionGroupHasModule
) => {
  const response = await api.post("/permissions-groups-has-modules", {
    get: permissions.get === 1,
    post: permissions.post === 0,
    put: permissions.put === 0,
    delete: permissions.delete === 0,
    modules_id: permissions.modules_id,
    permissions_groups_id: permissions.permissions_groups_id,
  });
  return response.data;
};

/**
 * Atualiza uma associação entre um grupo de permissões e um módulo.
 * @param {PermissionGroupHasModule} permissions - Dados da associação.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updatePermissionGroupHasModule = async (
  permissions: PermissionGroupHasModule
) => {
  const response = await api.put(
    `/permissions-groups-has-modules/${permissions.id}`,
    {
      get: permissions.get === 1,
      post: permissions.post === 1,
      put: permissions.put === 1,
      delete: permissions.delete === 1,
      modules_id: permissions.modules_id,
      permissions_groups_id: permissions.permissions_groups_id,
    }
  );
  return response.data;
};

/**
 * Busca todas as aplicações.
 * @returns {Promise<Application[]>} - Lista de aplicações.
 */
export const fetchApplications = async (): Promise<Application[]> => {
  const response = await api.get("/applications");
  return response.data;
};




export default api;
