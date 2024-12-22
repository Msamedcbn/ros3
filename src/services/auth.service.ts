import api from './api';
import type { LoginCredentials, AuthResponse } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async logout() {
    localStorage.removeItem('token');
    await api.post('/auth/logout');
  },

  async getCurrentUser() {
    const { data } = await api.get('/auth/me');
    return data;
  },

  async getTenantByDomain(domain: string) {
    const { data } = await api.get(`/tenants/domain/${domain}`);
    return data;
  }
};