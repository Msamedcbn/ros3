import api from './api';
import type { TenantInfo } from '../types/auth';

export const tenantService = {
  async create(data: Partial<TenantInfo>) {
    const response = await api.post('/tenants', data);
    return response.data;
  },

  async update(id: string, data: Partial<TenantInfo>) {
    const response = await api.put(`/tenants/${id}`, data);
    return response.data;
  },

  async getByDomain(domain: string) {
    const response = await api.get(`/tenants/domain/${domain}`);
    return response.data;
  }
};