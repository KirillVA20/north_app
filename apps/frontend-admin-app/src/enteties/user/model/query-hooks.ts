import { useQuery } from '@tanstack/react-query';
import { userKeys } from './keys';
import { fetchUsers, findUserById } from '../api/users-api';

export const useUsers = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUsers,
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export const useUserById = (id: string) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => findUserById(id),
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};
