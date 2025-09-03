import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../model/use-auth-store';
import { signIn, signUp } from '../../api/auth-api';

export const registrationSchema = z
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
    path: ['confirmPassword'],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function useRegistrationForm() {
  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const user = await signUp(data);
      const loginRes = await signIn({
        username: user.username,
        password: data.password,
      });
      setToken(loginRes.access_token);
    } catch (error: any) {
      setError('email', {
        type: 'manual',
        message: error?.response?.data?.message || 'Ошибка регистрации',
      });
    }
  };

  const onSubmitHandler = handleSubmit(onSubmit);

  return {
    register,
    onSubmit,
    onSubmitHandler,
    errors,
    isSubmitting,
    setError,
  };
}
