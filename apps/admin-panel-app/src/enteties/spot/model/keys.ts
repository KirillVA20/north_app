export const spotKeys = {
  all: ['spot'] as const,
  list: () => [...spotKeys.all, 'list'] as const,
  detail: (id: string) => [...spotKeys.all, 'detail', id] as const,
  byUser: (userId: string) => [...spotKeys.all, 'byUser', userId] as const,
};
