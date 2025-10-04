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

type LoginFormProps = {
  onSubmitHandler?: (tokens: { accessToken: string; refreshToken: string }) => void;
};

export function useLoginForm({ onSubmitHandler }: LoginFormProps) {
  const setTokens = useAuthStore((state) => state.setTokens);

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
      setTokens(res.access_token, res.refresh_token);
      onSubmitHandler?.({ 
        accessToken: res.access_token, 
        refreshToken: res.refresh_token 
      });
    } catch (error: any) {
      setError('username', {
        type: 'manual',
        message: error?.response?.data?.message || 'Ошибка входа',
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
