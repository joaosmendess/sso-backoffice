// Auth related types
export interface LoginResponse {
  token: string;
  customerData: UserCustomerData;
}

export interface UserCustomerData {
  name: string;
  username: string;
  company: string;
  companyId: number;
  hashCompany:string;
  permissions: UserPermission[];
}

export interface UserPermission {
  application: ApplicationDetails;
  modules: ModulePermission[];
}

export interface ApplicationDetails {
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
}

export interface ModulePermission {
  name: string;
  get: boolean;
  post: boolean;
  put: boolean;
  delete: boolean;
}

// User related types
export interface User {
  id: number;
  name: string;
  user: UserInfo;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserInfo {
  name: string;
  username: string;
  status: string;
}

export interface GetUserResponse {
  message: string;
  username: string;
  tagCompany:string;
  name: string;
  company: CompanyDetails;
}

// Company related types
export interface Company {
  tag: string;
  id: number;
  name: string;
  cnpj: string;
  ssoName: string | null;
  clientd: string | null;
  client_secret: string | null;
  tenantId: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyDetails {
  name: string;
  cnpj: string;
  ssoName: string;
  clientId: string;
  clientSecret: string;
  tenantId: string;
  redirectUrl: string;  
  redirectUri: string;

}

// Permission related types
export interface Permission {
  id: number;
  name: string;
  get: number;
  post: number;
  put: number;
  delete: number;
  modulesId: number;
  permissions_groupsId: number;
  created_at: string;
  updated_at: string;
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
  modulesId: number;
  permissions_groupsId: number;
  created_at: string;
  updated_at: string;
}

export interface UserHasPermission {
  id: number;
  permissions_groupsId: number;
  userId: number;
  created_at: string;
  updated_at: string;
  user: User;
  permissions_group: PermissionGroup;
}

// Module related types
export interface Module {
  id: number;
  name: string;
  applicationsId: number;
  created_at: string;
  updated_at: string;
}

// Application related types
export interface Application {
  id: string;
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  companyId: number;
}
