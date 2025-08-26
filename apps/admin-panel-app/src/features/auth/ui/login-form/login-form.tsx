import { Button, Stack, Input, Field } from '@chakra-ui/react';
import { useLoginForm } from '../../hooks/use-login-form';

export const LoginForm = () => {
  const { register, onSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={4}>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Имя пользователя или почта</Field.Label>
          <Input id="username" type="text" {...register('username')} />
          {errors.username ? (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Пароль</Field.Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password ? (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Button type="submit" colorScheme="blue" loading={isSubmitting}>
          Войти
        </Button>
      </Stack>
    </form>
  );
};
