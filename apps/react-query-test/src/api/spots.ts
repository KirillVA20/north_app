import { axiosInstance } from '../lib/axios';
import { Spot, CreateSpotDto, UpdateSpotDto } from '../types';

export const spotsApi = {
  // GET /spots - получить все споты (с пагинацией)
  getAll: async (limit = 10, offset = 0): Promise<Spot[]> => {
    const response = await axiosInstance.get<Spot[]>('/spots', {
      params: { limit, offset },
    });
    return response.data;
  },

  // GET /spots/:id - получить спот по ID
  getById: async (id: string): Promise<Spot> => {
    const response = await axiosInstance.get<Spot>(`/spots/${id}`);
    return response.data;
  },

  // GET /spots/search?query=... - поиск спотов по названию
  search: async (query: string): Promise<Spot[]> => {
    const response = await axiosInstance.get<Spot[]>('/spots/search', {
      params: { query },
    });
    return response.data;
  },

  // GET /spots/nearby?lng=...&lat=...&radius=... - найти ближайшие споты
  getNearby: async (lng: number, lat: number, radius: number): Promise<Spot[]> => {
    const response = await axiosInstance.get<Spot[]>('/spots/nearby', {
      params: { lng, lat, radius },
    });
    return response.data;
  },

  // POST /spots/create - создать новый спот (требует авторизации)
  create: async (data: CreateSpotDto): Promise<Spot> => {
    const response = await axiosInstance.post<Spot>('/spots/create', data);
    return response.data;
  },

  // PUT /spots/:id - обновить спот (требует авторизации)
  update: async (id: string, data: UpdateSpotDto): Promise<Spot> => {
    const response = await axiosInstance.put<Spot>(`/spots/${id}`, data);
    return response.data;
  },

  // DELETE /spots/:id - удалить спот (требует авторизации)
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(`/spots/${id}`);
    return response.data;
  },

  // GET /spots/user/:userId - получить споты пользователя
  getByUserId: async (userId: string): Promise<Spot[]> => {
    const response = await axiosInstance.get<Spot[]>(`/spots/user/${userId}`);
    return response.data;
  },
};
