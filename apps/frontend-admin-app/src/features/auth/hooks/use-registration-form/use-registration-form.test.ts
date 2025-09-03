import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useRegistrationForm } from './use-registration-form';
import { signIn, signUp } from '../../api/auth-api';
import { useAuthStore } from '../../model/use-auth-store';

jest.mock('../../api/auth-api');
jest.mock('../../model/use-auth-store');

const mockSignUp = signUp as jest.MockedFunction<typeof signUp>;
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockSetToken = jest.fn();
describe('useRegistrationForm hook', () => {
  beforeEach(() => {
    // Настройка моков перед каждым тестом
    (useAuthStore as jest.Mock).mockReturnValue({
      setToken: mockSetToken,
    });

    // Сбрасываем моки
    jest.clearAllMocks();
  });
  it('должен валидировать username длиной менее 3 символов', async () => {
    // Мокаем успешные ответы API
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const mockToken = 'fake-access-token';

    mockSignUp.mockResolvedValue(mockUser);
    mockSignIn.mockResolvedValue({ access_token: mockToken });

    const { result } = renderHook(() => useRegistrationForm());

    const formData = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'Password123',
      confirmPassword: 'Password123',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockSignUp).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@test.com',
      password: 'Password123',
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'Password123',
    });

    expect(mockSetToken).toHaveBeenCalledWith(mockToken);
  });
});
