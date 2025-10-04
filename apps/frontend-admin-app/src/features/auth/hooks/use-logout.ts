import { useAuthStore } from '../model/use-auth-store';
import { logout as logoutApi } from '../api/auth-api';

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Всегда очищаем локальное состояние
      logout();
    }
  };

  return { logout: handleLogout };
}
