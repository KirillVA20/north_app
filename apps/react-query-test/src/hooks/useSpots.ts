import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spotsApi } from '../api/spots';
import { CreateSpotDto, UpdateSpotDto } from '../types';

// Query keys для кеширования
export const spotKeys = {
  all: ['spots'] as const,
  list: (limit: number, offset: number) => ['spots', 'list', limit, offset] as const,
  detail: (id: string) => ['spots', id] as const,
  search: (query: string) => ['spots', 'search', query] as const,
  nearby: (lng: number, lat: number, radius: number) => ['spots', 'nearby', lng, lat, radius] as const,
  userSpots: (userId: string) => ['spots', 'user', userId] as const,
};

// Хук для получения спотов с пагинацией
export const useSpots = (limit = 10, offset = 0) => {
  return useQuery({
    queryKey: spotKeys.list(limit, offset),
    queryFn: () => spotsApi.getAll(limit, offset),
    staleTime: 30000,
  });
};

// Хук для получения спота по ID
export const useSpot = (id: string) => {
  return useQuery({
    queryKey: spotKeys.detail(id),
    queryFn: () => spotsApi.getById(id),
    enabled: !!id,
  });
};

// Хук для поиска спотов
export const useSearchSpots = (query: string) => {
  return useQuery({
    queryKey: spotKeys.search(query),
    queryFn: () => spotsApi.search(query),
    enabled: query.length > 0, // выполнить только если есть запрос
    staleTime: 60000, // кешируем результаты поиска на 1 минуту
  });
};

// Хук для поиска ближайших спотов
export const useNearbySpots = (lng: number, lat: number, radius: number) => {
  return useQuery({
    queryKey: spotKeys.nearby(lng, lat, radius),
    queryFn: () => spotsApi.getNearby(lng, lat, radius),
    enabled: !!(lng && lat && radius),
    staleTime: 10000,
  });
};

// Хук для создания спота
export const useCreateSpot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpotDto) => spotsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });
};

// Хук для обновления спота
export const useUpdateSpot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpotDto }) =>
      spotsApi.update(id, data),
    onSuccess: (_, variables) => {
      // Инвалидируем кеш конкретного спота и общий список
      queryClient.invalidateQueries({ queryKey: spotKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });
};

// Хук для удаления спота
export const useDeleteSpot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => spotsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotKeys.all });
    },
  });
};

// Хук для получения спотов пользователя
export const useUserSpots = (userId: string) => {
  return useQuery({
    queryKey: spotKeys.userSpots(userId),
    queryFn: () => spotsApi.getByUserId(userId),
    enabled: !!userId,
  });
};
