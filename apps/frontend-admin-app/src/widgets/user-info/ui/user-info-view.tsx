import { Box, Button, Text, Stack } from '@chakra-ui/react';

export type UserInfoViewProps = {
  username: string;
  email: string;
  onLogout: () => void;
};

export const UserInfoView = ({
  username,
  email,
  onLogout,
}: UserInfoViewProps) => (
  <Box p={4} borderWidth={1} borderRadius={8} boxShadow="md">
    <Stack gap={2}>
      <Text fontWeight="bold">Пользователь: {username}</Text>
      <Text>Почта: {email}</Text>
      <Button colorScheme="red" onClick={onLogout}>
        Выйти
      </Button>
    </Stack>
  </Box>
);
