import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUser } from './types';
import { createUser } from '../api/users-api';
import { userKeys } from './keys';

export const useUserCreate = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: CreateUser) => {
      return createUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });

  return {
    createUser: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
