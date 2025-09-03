import { Table, Alert, Spinner, HStack, Button } from '@chakra-ui/react';
import type { Spot } from '../model/types';

type SpotsTableProps = {
  spots: Spot[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
};

export const SpotsTable = ({
  spots,
  isLoading,
  isError,
  onRetry,
}: SpotsTableProps) => {
  if (isLoading) {
    return (
      <HStack>
        <Spinner size="sm" />
        <span>Загрузка спотов…</span>
      </HStack>
    );
  }

  if (isError) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Не удалось загрузить споты.</Alert.Title>
          {onRetry ? (
            <Button size="sm" ml={3} onClick={onRetry}>
              Повторить
            </Button>
          ) : null}
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!spots || spots.length === 0) {
    return (
      <Alert.Root status="info">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Споты не найдены</Alert.Title>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Table.Root size="sm" variant="outline" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Description</Table.ColumnHeader>
          <Table.ColumnHeader>Lng</Table.ColumnHeader>
          <Table.ColumnHeader>Lat</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {spots.map((s) => (
          <Table.Row key={s.id}>
            <Table.Cell>{s.id}</Table.Cell>
            <Table.Cell>{s.name}</Table.Cell>
            <Table.Cell>{s.description ?? '-'}</Table.Cell>
            <Table.Cell>{s.location.coordinates[0]}</Table.Cell>
            <Table.Cell>{s.location.coordinates[1]}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
