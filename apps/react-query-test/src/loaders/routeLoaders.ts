import { LoaderFunctionArgs } from 'react-router-dom';
import { queryClient } from '../lib/queryClient';
import { routeKeys } from '../hooks/useRoutes';
import { spotKeys } from '../hooks/useSpots';
import { routesApi } from '../api/routes';
import { spotsApi } from '../api/spots';

// Loader для списка маршрутов
export const routesListLoader = async () => {
  // Предзагружаем данные в QueryClient перед рендером страницы
  await queryClient.ensureQueryData({
    queryKey: routeKeys.all,
    queryFn: routesApi.getAll,
    staleTime: 30000,
  });

  return null; // данные будут доступны через useQuery в компоненте
};

// Loader для детальной страницы маршрута
export const routeDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    throw new Error('Route ID is required');
  }

  // Предзагружаем данные маршрута
  await queryClient.ensureQueryData({
    queryKey: routeKeys.detail(id),
    queryFn: () => routesApi.getById(id),
  });

  return null;
};

// Loader для списка спотов
export const spotsListLoader = async () => {
  const limit = 10;
  const offset = 0;

  await queryClient.ensureQueryData({
    queryKey: spotKeys.list(limit, offset),
    queryFn: () => spotsApi.getAll(limit, offset),
    staleTime: 30000,
  });

  return null;
};

// Loader для детальной страницы спота
export const spotDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    throw new Error('Spot ID is required');
  }

  await queryClient.ensureQueryData({
    queryKey: spotKeys.detail(id),
    queryFn: () => spotsApi.getById(id),
  });

  return null;
};
