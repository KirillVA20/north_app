import { Button, Stack, Input, Field } from '@chakra-ui/react';
import { useRegistrationForm } from '../../hooks/use-registration-form/use-registration-form';

export const RegistrationForm = () => {
  const { register, onSubmitHandler, errors, isSubmitting, setError } =
    useRegistrationForm();

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack gap={4}>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Никнейм</Field.Label>
          <Input id="username" type="text" {...register('username')} />
          {errors.username ? (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Почта</Field.Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email ? (
            <Field.ErrorText>{errors.email.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Пароль</Field.Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password ? (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>Повторите пароль</Field.Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword ? (
            <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Button type="submit" colorScheme="blue" loading={isSubmitting}>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
