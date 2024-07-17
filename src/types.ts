export interface Permission {
  id: number;
  name: string;
  get: number;
  post: number;
  put: number;
  delete: number;
  modules_id: number;
  permissions_groups_id: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  user: {
    name: string;
    username: string;
    status: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: number;
  name: string;
  applications_id: number;
  created_at: string;
  updated_at: string;
}

export interface GetUserResponse {
  message:string;
  username: string;
  name: string;

  company: {
    name: string;
    cnpj: string;
    ssoName: string;
    clientId: string;
    clientSecret: string;
    tenantId: string;
    redirectUrl:string;
  };
}

export interface LoginResponse {
  token: string;
  customerData: {
    name: string;
    username: string;
    company: string;
    company_id:number;
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
        get: boolean;
        post: boolean;
        put: boolean;
        delete: boolean;
      }>;
    }>;
  };
}

export interface PermissionGroup {
  id: number;
  name: string;

  created_at: string;
  updated_at: string;
}

export interface PermissionGroupHasModule {
  id: number;
  get: number;
  post: number;
  put: number;
  delete: number;
  modules_id: number;
  permissions_groups_id: number;
  created_at: string;
  updated_at: string;
}

export interface UserHasPermission {
  id: number;
  permissions_groups_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  permissions_group: PermissionGroup;
}

export interface Application {
  id: string;
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  company_id: number;
}

export interface Company {
  tag:string;
  id: number;
  name: string;
  cnpj: string;
  ssoName: string | null;
  client_id: string | null;
  client_secret: string | null;
  tenant_id: string | null;
  created_at: string;
  updated_at: string;
}
