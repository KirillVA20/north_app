export const userKeys = {
  all: ['user'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
  byEmail: (email: string) => [...userKeys.all, 'byEmail', email] as const,
  byUsername: (u: string) => [...userKeys.all, 'byUsername', u] as const,
};
