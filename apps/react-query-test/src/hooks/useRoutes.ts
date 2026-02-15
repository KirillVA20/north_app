import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { routesApi } from '../api/routes';
import { CreateRouteDto } from '../types';

// Query keys для кеширования
export const routeKeys = {
  all: ['routes'] as const,
  detail: (id: string) => ['routes', id] as const,
};

// Хук для получения всех маршрутов
export const useRoutes = () => {
  return useQuery({
    queryKey: routeKeys.all,
    queryFn: routesApi.getAll,
    staleTime: 30000, // данные свежие 30 секунд
  });
};

// Хук для получения маршрута по ID
export const useRoute = (id: string) => {
  return useQuery({
    queryKey: routeKeys.detail(id),
    queryFn: () => routesApi.getById(id),
    enabled: !!id, // выполнить только если id не пустой
  });
};

// Хук для создания маршрута
export const useCreateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteDto) => routesApi.create(data),
    onSuccess: () => {
      // Инвалидируем кеш списка маршрутов после создания
      queryClient.invalidateQueries({ queryKey: routeKeys.all });
    },
  });
};

// Хук для удаления маршрута
export const useDeleteRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => routesApi.delete(id),
    onSuccess: () => {
      // Инвалидируем кеш после удаления
      queryClient.invalidateQueries({ queryKey: routeKeys.all });
    },
  });
};
