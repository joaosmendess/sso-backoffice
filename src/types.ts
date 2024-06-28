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
    userName: string;
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

  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface PermissionGroup {
    id: number;
    name: string;
    created_at: string
    updated_at: string
  }
  
  export interface PermissionGroupHasModule {
    id: number;
    get: number;
    post: number;
    put: number;
    delete: number;
    modules_id: number;
    permissions_groups_id: number;
    created_at: string | null;
    updated_at: string | null;
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
    empresa_id: number;
  }
  