export interface LoginCredentials {
  email: string;
  password: string;
  domain: string;
}

export interface TenantInfo {
  id: string;
  name: string;
  domain: string;
  logo_url?: string;
  theme: {
    primary_color: string;
  };
  is_active: boolean;
}

export interface AuthUser {
  id: string;
  tenant_id: string;
  email: string;
  role: 'admin' | 'manager' | 'waiter' | 'kitchen' | 'cashier';
  is_active: boolean;
  last_login?: string;
  tenant?: TenantInfo;
}

export interface AuthResponse {
  user: AuthUser;
  tenant: TenantInfo;
  token: string;
}