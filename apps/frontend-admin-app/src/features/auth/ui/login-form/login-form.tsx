import { Button, Stack, Input, Field } from '@chakra-ui/react';
import { useLoginForm } from '../../hooks/use-login-form';

type LoginFormProps = {
  onSubmitHandler?: (token: string) => void;
};

export const LoginForm = ({ onSubmitHandler }: LoginFormProps) => {
  const { register, onSubmit, errors, isSubmitting } = useLoginForm({
    onSubmitHandler,
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={4}>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Имя пользователя или почта</Field.Label>
          <Input
            id="username"
            type="text"
            {...register('username')}
            data-testid="username"
          />
          {errors.username ? (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Пароль</Field.Label>
          <Input
            id="password"
            data-testid="password"
            type="password"
            {...register('password')}
          />
          {errors.password ? (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Button
          type="submit"
          colorScheme="blue"
          loading={isSubmitting}
          disabled={!!isSubmitting}
          data-testid="submit"
        >
          Войти
        </Button>
      </Stack>
    </form>
  );
};
