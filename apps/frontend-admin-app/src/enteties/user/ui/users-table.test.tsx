import { fireEvent, render, screen } from '@testing-library/react';
import { UsersTable } from './users-table';
import { Provider } from '@test/ui/provider';

describe('User Table', () => {
  test('Its have loading mode', () => {
    render(<UsersTable isLoading />, { wrapper: Provider });
    expect(screen.getByText('Загрузка пользователей…')).toBeInTheDocument();
  });
  test('Its have error mode', () => {
    const handleRetry = jest.fn();

    render(<UsersTable isError onRetry={handleRetry} />, { wrapper: Provider });
    expect(
      screen.getByText('Не удалось загрузить пользователей.')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Повторить'));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
  test('Its have empty user alert', () => {
    render(<UsersTable users={[]} />, {
      wrapper: Provider,
    });
    expect(screen.getByText('Пользователи не найден')).toBeInTheDocument();
  });
});
