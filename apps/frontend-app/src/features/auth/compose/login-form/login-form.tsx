import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './login-form.module.css';
import { useForm } from 'react-hook-form';
import { Input } from '@app/shared/ui/input';
import { Button } from '@app/shared/ui/Button';
import { useSignInMutation } from '../../api/auth-api';
import { useSession } from '@app/enteties/session';

// Схема валидации с Zod
const loginSchema = z.object({
  username: z.string().min(1, 'Обязательное поле'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Подключение Zod-валидации
  });

  const { setSessionToken } = useSession();

  const [signIn] = useSignInMutation();

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn(data);

    if (res?.data?.access_token) {
      setSessionToken(res.data['access_token']);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="username" className={styles.label}>
          Имя пользователя или почта
        </label>
        <Input
          id="username"
          type="text"
          isError={!!errors.username}
          message={errors.username?.message}
          {...register('username')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          isError={!!errors.password}
          message={errors.password?.message}
          {...register('password')}
        />
      </div>

      <Button type="submit">Войти</Button>
    </form>
  );
};
