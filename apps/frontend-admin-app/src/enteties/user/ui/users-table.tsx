import { Table, Spinner, HStack } from '@chakra-ui/react';
import { AlertMessage } from '@test/ui';
import type { User } from '../model/types';

type UsersTableProps = {
  users?: User[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
};

export const UsersTable = ({
  users = [],
  isLoading,
  isError,
  onRetry,
}: UsersTableProps) => {
  if (isLoading) {
    return (
      <HStack>
        <Spinner size="sm" />
        <span>Загрузка пользователей…</span>
      </HStack>
    );
  }

  if (isError) {
    return (
      <AlertMessage
        status="error"
        title="Не удалось загрузить пользователей."
        actionLabel={onRetry ? 'Повторить' : undefined}
        onActionClick={onRetry}
      />
    );
  }

  if (!users || users.length === 0) {
    return <AlertMessage status="info" title="Пользователи не найден" />;
  }

  return (
    <Table.Root size="sm" variant="outline" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>Username</Table.ColumnHeader>
          <Table.ColumnHeader>First name</Table.ColumnHeader>
          <Table.ColumnHeader>Last name</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell>{u.id}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.username}</Table.Cell>
            <Table.Cell>{u.firstName ?? '-'}</Table.Cell>
            <Table.Cell>{u.lastName ?? '-'}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
