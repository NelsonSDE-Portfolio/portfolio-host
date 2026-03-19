import { create } from 'zustand';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;

      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      set({
        user,
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || error.message
          : 'Login failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, name?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
      });
      const { access_token, user } = response.data;

      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      set({
        user,
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || error.message
          : 'Registration failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  requestPasswordReset: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/auth/request-reset', { email });
      set({ isLoading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || error.message
          : 'Request failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      set({ isLoading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || error.message
          : 'Reset failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
  },

  clearError: () => set({ error: null }),
}));
