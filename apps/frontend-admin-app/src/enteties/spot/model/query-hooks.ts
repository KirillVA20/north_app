import { useQuery } from '@tanstack/react-query';
import { spotKeys } from './keys';
import {
  fetchSpots,
  fetchSpotsByUserId,
  findSpotById,
  fetchFavoriteSpots,
  isSpotFavorite,
} from '../api/spots-api';

export const useSpots = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: spotKeys.all,
    queryFn: fetchSpots,
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export const useSpotById = (id: string) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: spotKeys.detail(id),
    queryFn: () => findSpotById(id),
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export const useSpotsByUserId = (userId: string) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: spotKeys.byUser(userId),
    queryFn: () => fetchSpotsByUserId(userId),
    enabled: !!userId,
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export const useFavoriteSpots = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: spotKeys.favorites(),
    queryFn: fetchFavoriteSpots,
  });

  return {
    isPending,
    isError,
    data: data?.spots,
    error,
    refetch,
  };
};

export const useIsSpotFavorite = (spotId: string) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: spotKeys.isFavorite(spotId),
    queryFn: () => isSpotFavorite(spotId),
    enabled: !!spotId,
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};
