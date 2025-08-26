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
};

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export async function getProfile(): Promise<User> {
  const response = await axiosInstance.get(`/auth/profile`);
  const result = UserSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('Invalid user data');
  }
  return result.data;
}
