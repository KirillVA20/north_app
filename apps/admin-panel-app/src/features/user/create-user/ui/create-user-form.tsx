import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Input, Field } from '@chakra-ui/react';

import {
  useUserCreate,
  CreateUserSchema,
  CreateUserSchemaType,
} from '@/enteties/user';

type CreateUserFormProps = {
  onSuccess?: () => void;
};

const DEFAULT_VALUE = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: DEFAULT_VALUE,
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const { createUser, isPending } = useUserCreate();

  const onSubmit = handleSubmit((values) => {
    createUser(values, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={3}>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input type="email" {...register('email')} />
          {errors.email ? (
            <Field.ErrorText>{errors.email.message}</Field.ErrorText>
          ) : null}
        </Field.Root>

        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register('username')} />
          {errors.username ? (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          ) : null}
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input type="password" {...register('password')} />
          {errors.password ? (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          ) : null}
        </Field.Root>

        <Field.Root>
          <Field.Label>First name</Field.Label>
          <Input {...register('firstName')} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Last name</Field.Label>
          <Input {...register('lastName')} />
        </Field.Root>

        <Button type="submit" loading={isPending} disabled={isPending}>
          Создать
        </Button>
      </Stack>
    </form>
  );
};
