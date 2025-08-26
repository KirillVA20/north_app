import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from '../api/auth-api';
import { useAuthStore } from '../model/use-auth-store';

export const loginSchema = z.object({
  username: z.string().min(1, 'Обязательное поле'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    try {
      const res = await signIn(data);
      setToken(res.access_token);
    } catch (error: any) {
      setError('username', {
        type: 'manual',
        message: error?.response?.data?.message || 'Ошибка регистрации',
      });
    }
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
  };
}
