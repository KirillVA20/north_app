import { User, UserSchema } from '@/enteties/user';
import axios from 'axios';

type SignUpUserRequest = {
  username: string;
  email: string;
  password: string;
};

type SignInUserRequest = {
  username: string;
  password: string;
};

type SignInUserResponse = {
  access_token: string;
  refresh_token: string; // Добавляем refresh token
};

type RefreshTokenRequest = {
  refresh_token: string;
};

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor для автоматического добавления access token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor для автоматического обновления токенов при 401 ошибке
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await refreshAccessToken(refreshToken);

          // Обновляем токены в localStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          // Обновляем заголовок для повторного запроса
          originalRequest.headers.Authorization = `Bearer ${response.access_token}`;

          // Повторяем оригинальный запрос
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Если refresh не удался, выходим из системы
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function signUp(user: SignUpUserRequest): Promise<User> {
  const response = await axiosInstance.post(`/auth/signup`, user);
  const result = UserSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('Invalid user data');
  }
  return result.data;
}

export async function signIn(
  credentials: SignInUserRequest
): Promise<SignInUserResponse> {
  const response = await axiosInstance.post(`/auth/signin`, credentials);
  return response.data as SignInUserResponse;
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await axiosInstance.post(`/auth/refresh`, {
    refresh_token: refreshToken,
  });
  return response.data as RefreshTokenResponse;
}

export async function logout(): Promise<void> {
  try {
    await axiosInstance.post(`/auth/logout`);
  } finally {
    // Очищаем токены независимо от результата запроса
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

export async function getProfile(): Promise<User> {
  const response = await axiosInstance.get(`/auth/profile`);
  const result = UserSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('Invalid user data');
  }
  return result.data;
}
