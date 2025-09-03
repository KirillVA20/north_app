import axios from 'axios';
import type { CreateSpot, Spot } from '../model/types';
import { SpotSchema } from '../model/schema/spot.schema';

const API_BASE_URL = 'http://localhost:3002';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchSpots(): Promise<Spot[]> {
  const url = `${API_BASE_URL}/spots`;
  const response = await axios.get<Spot[]>(url);
  const result = SpotSchema.array().safeParse(response?.data);
  return result?.data ?? [];
}

export async function createSpot(payload: CreateSpot): Promise<Spot> {
  const response = await axiosInstance.post<Spot>(`/spots/create`, payload);
  return response.data;
}

export async function findSpotById(id: string): Promise<Spot | null> {
  const url = `${API_BASE_URL}/spots/${id}`;
  const response = await axios.get<Spot | null>(url);
  return response.data ?? null;
}

export async function deleteSpot(id: string): Promise<{ message: string }> {
  const response = await axiosInstance.delete<{ message: string }>(
    `/spots/${id}`
  );
  return response.data;
}

export async function fetchSpotsByUserId(userId: string): Promise<Spot[]> {
  const url = `${API_BASE_URL}/spots/user/${userId}`;
  const response = await axios.get<Spot[]>(url);
  const result = SpotSchema.array().safeParse(response?.data);
  return result?.data ?? [];
}

export async function addSpotToFavorites(
  spotId: string
): Promise<{ message: string }> {
  const response = await axiosInstance.post<{ message: string }>(
    `/favorites/spots/${spotId}`
  );
  return response.data;
}

export async function removeSpotFromFavorites(
  spotId: string
): Promise<{ message: string }> {
  const response = await axiosInstance.delete<{ message: string }>(
    `/favorites/spots/${spotId}`
  );
  return response.data;
}

export async function fetchFavoriteSpots(): Promise<{ spots: Spot[] }> {
  const response = await axiosInstance.get<{ spots: Spot[] }>(
    '/favorites/spots'
  );
  const result = SpotSchema.array().safeParse(response?.data?.spots);
  return { spots: result?.data ?? [] };
}

export async function isSpotFavorite(spotId: string): Promise<boolean> {
  const response = await axiosInstance.get<boolean>(
    `/favorites/spots/${spotId}`
  );
  return response.data;
}
