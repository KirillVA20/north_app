import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  );
};
