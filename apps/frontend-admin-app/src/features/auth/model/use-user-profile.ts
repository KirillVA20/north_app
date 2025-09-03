import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/auth-api';

export function useUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getProfile,
  });
}
