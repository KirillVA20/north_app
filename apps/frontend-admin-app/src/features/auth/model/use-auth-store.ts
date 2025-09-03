import { create } from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  setToken: (token) => {
    localStorage.setItem('access_token', token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ token: null, isAuthenticated: false });
  },
  isAuthenticated: !!(
    typeof window !== 'undefined' && localStorage.getItem('access_token')
  ),
}));
