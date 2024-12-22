import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import type { AuthUser, LoginCredentials, TenantInfo } from '../types/auth';

interface AuthContextType {
  user: AuthUser | null;
  tenant: TenantInfo | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  tenant: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: AuthUser | null;
    tenant: TenantInfo | null;
    loading: boolean;
  }>({
    user: null,
    tenant: null,
    loading: true,
  });

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      const user = await authService.getCurrentUser();
      if (user) {
        setState({
          user,
          tenant: user.tenant || null,
          loading: false,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  const login = async (credentials: LoginCredentials) => {
    const { user, tenant, token } = await authService.login(credentials);
    localStorage.setItem('token', token);
    setState({
      user,
      tenant,
      loading: false,
    });
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('token');
      setState({
        user: null,
        tenant: null,
        loading: false,
      });
    }
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};