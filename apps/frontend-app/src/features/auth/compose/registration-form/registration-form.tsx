import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@app/shared/ui/input';
import styles from './registration-form.module.css';
import clsx from 'clsx';
import { Button } from '@app/shared/ui/Button';
import { useSignInMutation, useSignUpMutation } from '../../api/auth-api';
import { User } from '@app/enteties/users';
import { useSession } from '@app/enteties/session';

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Никнейм должен быть не менее 3 символов')
      .max(20, 'Никнейм должен быть не длиннее 20 символов'),
    email: z.string().email('Некорректная почта'),
    password: z
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // Указываем, к какому полю относится ошибка
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // Добавлено для ручной установки ошибок
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const { setSessionToken } = useSession();

  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    const res = await signUp(data);

    if (res.error) {
      setError('email', {
        type: 'manual',
        message: res.error?.data?.message || 'Произошла ошибка',
      });
    }

    if (res.data) {
      await authAction(data);
    }
  };

  const authAction = async (data: User) => {
    const loginData = {
      username: data.username,
      password: data.password,
    };

    const loginRes = await signIn(loginData);

    if (loginRes?.data?.access_token) {
      setSessionToken(loginRes.data['access_token']);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Поле никнейма */}
      <div className={styles.field}>
        <label htmlFor="username" className={styles.label}>
          Никнейм
        </label>
        <Input
          id="username"
          type="text"
          className={clsx(styles.input, {
            [styles.error]: errors.username,
          })}
          {...register('username')}
          isError={!!errors.username}
          message={errors.username?.message}
        />
      </div>

      {/* Поле почты */}
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Почта
        </label>
        <Input
          id="email"
          type="email"
          className={clsx(styles.input, {
            [styles.error]: errors.email,
          })}
          {...register('email')}
          isError={!!errors.email}
          message={errors.email?.message}
        />
      </div>

      {/* Поле пароля */}
      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          className={clsx(styles.input, {
            [styles.error]: errors.password,
          })}
          {...register('password')}
          isError={!!errors.password}
          message={errors.password?.message}
        />
      </div>

      {/* Поле подтверждения пароля */}
      <div className={styles.field}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Повторите пароль
        </label>
        <Input
          id="confirmPassword"
          type="password"
          className={clsx(styles.input, {
            [styles.error]: errors.confirmPassword,
          })}
          {...register('confirmPassword')}
          isError={!!errors.confirmPassword}
          message={errors.confirmPassword?.message}
        />
      </div>

      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
};
