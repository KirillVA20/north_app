import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSpot } from './types';
import {
  createSpot,
  deleteSpot,
  addSpotToFavorites,
  removeSpotFromFavorites,
} from '../api/spots-api';
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

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (spotId: string) => addSpotToFavorites(spotId),
    onSuccess: (_, spotId) => {
      // Invalidate favorites list and specific spot favorite status
      queryClient.invalidateQueries({ queryKey: spotKeys.favorites() });
      queryClient.invalidateQueries({ queryKey: spotKeys.isFavorite(spotId) });
      // Also invalidate all spots to update favorite status in lists
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });

  return {
    addToFavorites: mutate,
    isPending,
    isSuccess,
    isError,
  };
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (spotId: string) => removeSpotFromFavorites(spotId),
    onSuccess: (_, spotId) => {
      // Invalidate favorites list and specific spot favorite status
      queryClient.invalidateQueries({ queryKey: spotKeys.favorites() });
      queryClient.invalidateQueries({ queryKey: spotKeys.isFavorite(spotId) });
      // Also invalidate all spots to update favorite status in lists
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });

  return {
    removeFromFavorites: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
