import axios from 'axios';
import type { CreateUser, User } from '../model/types';
import { UserSchema } from '../model/schema/user.schema';

const API_BASE_URL = 'http://localhost:3001';

export async function fetchUsers(): Promise<User[]> {
  const url = `${API_BASE_URL}/user`;
  const response = await axios.get<User[]>(url);
  const result = UserSchema.array().safeParse(response?.data);

  return result?.data ?? [];
}

export async function createUser(payload: CreateUser): Promise<User> {
  const url = `${API_BASE_URL}/user`;
  const response = await axios.post<User>(url, payload);
  return response.data;
}

export async function findUserById(id: string): Promise<User | null> {
  const url = `${API_BASE_URL}/user/${id}`;
  const response = await axios.get<User | null>(url);
  return response.data ?? null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const url = `${API_BASE_URL}/user/by-email`;
  const response = await axios.get<User | null>(url, { params: { email } });
  return response.data ?? null;
}

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const url = `${API_BASE_URL}/user/by-username/${encodeURIComponent(
    username
  )}`;
  const response = await axios.get<User | null>(url);
  return response.data ?? null;
}
