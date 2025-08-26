import { LoginForm, RegistrationForm } from '@/features/auth';
import { Card, Container, Tabs } from '@chakra-ui/react';

export const Auth = () => {
  return (
    <Container maxW="500px" mx="auto">
      <Tabs.Root defaultValue="auth" variant="enclosed">
        <Tabs.List>
          <Tabs.Trigger value="auth">Вход</Tabs.Trigger>
          <Tabs.Trigger value="reg">Регистрация</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="auth">
          <AuthContent />
        </Tabs.Content>

        <Tabs.Content value="reg">
          <RegContent />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

const AuthContent = () => (
  <Card.Root>
    <Card.Header>
      <Card.Title>Вход в систему</Card.Title>
      <Card.Description>Введите свои учетные данные</Card.Description>
    </Card.Header>
    <Card.Body>
      <LoginForm />
    </Card.Body>
  </Card.Root>
);

const RegContent = () => (
  <Card.Root>
    <Card.Header>
      <Card.Title>Регистрация</Card.Title>
    </Card.Header>
    <Card.Body>
      <RegistrationForm />
    </Card.Body>
  </Card.Root>
);
