import { UsersTable, useUsers } from '@/enteties/user';
import { Button, Wrap } from '@chakra-ui/react';
import { useState } from 'react';
import { CreateUserForm } from '@/features/user/create-user';
import { Modal } from '@test/ui';

export const UserTable = () => {
  const { data, isPending, isError, refetch } = useUsers();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Wrap gap={`10px`}>
      <UsersTable
        users={data ?? []}
        isLoading={isPending}
        isError={isError}
        onRetry={refetch}
      />
      <Button onClick={() => setOpen(true)} mb={4}>
        Добавить пользователя
      </Button>
      <Modal open={open} onOpenChange={setOpen} title="Новый пользователь">
        <CreateUserForm onSuccess={handleSuccess} />
      </Modal>
    </Wrap>
  );
};
