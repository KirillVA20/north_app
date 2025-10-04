import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  refreshToken:
    typeof window !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : null,

  setTokens: (accessToken, refreshToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  isAuthenticated: !!(
    typeof window !== 'undefined' &&
    localStorage.getItem('access_token') &&
    localStorage.getItem('refresh_token')
  ),
}));
