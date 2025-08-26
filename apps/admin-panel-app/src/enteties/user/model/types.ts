export type User = {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateUser = {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
