import { QueryClientProvider } from '@/app/providers/query-client';
import { Container, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Header } from '@/widgets/header';
import { NotAuthLayout } from './layouts/not-auth-layout';
import { Auth } from '@/widgets/auth';
import { useAuthStore } from '@/features/auth';
import { SpotPage } from '@/pages/spots-page';
import { Provider } from '@test/ui';

export default function App() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  if (!isAuth) {
    return (
      <QueryClientProvider>
        <Provider>
          <Container height="100%" paddingTop={`40px`}>
            <NotAuthLayout>
              <Auth />
            </NotAuthLayout>
          </Container>
        </Provider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider>
      <Provider>
        <Header />
        <Container height="100%">
          <SimpleGrid columns={12} height={`100%`} gap={10}>
            <GridItem colSpan={12}>
              <SpotPage />
            </GridItem>
          </SimpleGrid>
        </Container>
      </Provider>
    </QueryClientProvider>
  );
}
