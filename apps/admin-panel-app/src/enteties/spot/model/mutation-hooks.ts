import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSpot } from './types';
import { createSpot, deleteSpot } from '../api/spots-api';
import { spotKeys } from './keys';

export const useSpotCreate = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: CreateSpot) => {
      return createSpot(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });

  return {
    createSpot: mutate,
    isPending,
    isSuccess,
    isError,
  };
};

export const useDeleteSpot = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => deleteSpot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });

  return {
    deleteSpot: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
