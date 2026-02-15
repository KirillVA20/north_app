import { axiosInstance } from '../lib/axios';
import { Route, CreateRouteDto } from '../types';

export const routesApi = {
  // GET /routes - получить все маршруты
  getAll: async (): Promise<Route[]> => {
    const response = await axiosInstance.get<Route[]>('/routes');
    return response.data;
  },

  // GET /routes/:id - получить маршрут по ID
  getById: async (id: string): Promise<Route> => {
    const response = await axiosInstance.get<Route>(`/routes/${id}`);
    return response.data;
  },

  // POST /routes - создать новый маршрут
  create: async (data: CreateRouteDto): Promise<Route> => {
    const response = await axiosInstance.post<Route>('/routes', data);
    return response.data;
  },

  // DELETE /routes/:id - удалить маршрут
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/routes/${id}`);
  },
};
