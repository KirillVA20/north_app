import { QueryClient } from '@tanstack/react-query';

// Создаем глобальный QueryClient для использования в loaders
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});
