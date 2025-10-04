import { useAuthStore } from '@/features/auth/model/use-auth-store';
import { UserInfoView } from './ui/user-info-view';
import { useUserProfile } from '@/features/auth/model/use-user-profile';
import { useLogout } from '@/features/auth';

export const UserInfo = () => {
  const { logout } = useLogout();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: user, isLoading, isError } = useUserProfile();

  if (!isAuthenticated || isLoading || isError || !user) return null;

  return (
    <UserInfoView
      username={user.username}
      email={user.email}
      onLogout={logout}
    />
  );
};
