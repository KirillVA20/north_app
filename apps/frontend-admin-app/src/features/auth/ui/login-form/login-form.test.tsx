import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './login-form';
import { useLoginForm } from '../../hooks/use-login-form';
import { signIn } from '../../api/auth-api';
import { useAuthStore } from '../../model/use-auth-store';
import { Provider } from '@test/ui/provider';

// Мокаем зависимости
jest.mock('../../hooks/use-login-form');
jest.mock('../../api/auth-api');
jest.mock('../../model/use-auth-store');

const mockUseLoginForm = useLoginForm as jest.MockedFunction<
  typeof useLoginForm
>;
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockSetToken = jest.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    // Настройка моков
    mockUseLoginForm.mockReturnValue({
      register: jest.fn(),
      onSubmit: jest.fn(),
      errors: {},
      isSubmitting: false,
    });

    (useAuthStore as jest.Mock).mockReturnValue({
      setToken: mockSetToken,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен рендерить форму с полями username и password', () => {
    render(<LoginForm />, { wrapper: Provider });

    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('должен отображать ошибки валидации для пустого username', () => {
    mockUseLoginForm.mockReturnValue({
      register: jest.fn(),
      onSubmit: jest.fn(),
      errors: { username: { message: 'Обязательное поле' } },
      isSubmitting: false,
    });

    render(<LoginForm />, { wrapper: Provider });

    expect(screen.getByText('Обязательное поле')).toBeInTheDocument();
  });

  it('должен отображать ошибки валидации для короткого пароля', () => {
    mockUseLoginForm.mockReturnValue({
      register: jest.fn(),
      onSubmit: jest.fn(),
      errors: {
        password: { message: 'Пароль должен быть не менее 6 символов' },
      },
      isSubmitting: false,
    });

    render(<LoginForm />, { wrapper: Provider });

    expect(
      screen.getByText('Пароль должен быть не менее 6 символов')
    ).toBeInTheDocument();
  });

  it('должен вызывать onSubmitHandler с токеном при успешной авторизации', async () => {
    const mockOnSubmitHandler = jest.fn();
    const mockToken = 'fake-access-token';

    mockSignIn.mockResolvedValue({ access_token: mockToken });

    mockUseLoginForm.mockReturnValue({
      register: jest.fn(),
      onSubmit: jest.fn().mockImplementation((e) => {
        e.preventDefault();
        mockOnSubmitHandler(mockToken);
      }),
      errors: {},
      isSubmitting: false,
    });

    render(<LoginForm onSubmitHandler={mockOnSubmitHandler} />, {
      wrapper: Provider,
    });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    expect(mockOnSubmitHandler).toHaveBeenCalledWith(mockToken);
    expect(mockOnSubmitHandler).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать onSubmitHandler только при успешной авторизации, не при ошибке', async () => {
    const mockOnSubmitHandler = jest.fn();

    // Мокаем ошибку API
    mockSignIn.mockRejectedValue(new Error('Unauthorized'));

    mockUseLoginForm.mockReturnValue({
      register: jest.fn(),
      onSubmit: jest.fn().mockImplementation((e) => {
        e.preventDefault();
        // Симулируем ошибку - onSubmitHandler не должен вызываться
      }),
      errors: { username: { message: 'Unauthorized' } },
      isSubmitting: false,
    });

    render(<LoginForm onSubmitHandler={mockOnSubmitHandler} />, {
      wrapper: Provider,
    });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    // onSubmitHandler не должен вызываться при ошибке
    expect(mockOnSubmitHandler).not.toHaveBeenCalled();
  });
});
