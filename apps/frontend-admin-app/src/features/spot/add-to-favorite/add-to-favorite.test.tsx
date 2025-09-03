import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AddToFavorite } from './add-to-favorite';

// Mock the useFavoriteToggle hook
jest.mock('@/enteties/spot', () => ({
  useFavoriteToggle: jest.fn(),
}));

const mockUseFavoriteToggle = require('@/enteties/spot').useFavoriteToggle;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('AddToFavorite', () => {
  const mockSpotId = 'test-spot-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders favorite button when spot is not favorited', () => {
    mockUseFavoriteToggle.mockReturnValue({
      isFavorite: false,
      isLoading: false,
      toggleFavorite: jest.fn(),
    });

    render(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} />
      </TestWrapper>
    );

    expect(screen.getByText('В избранное')).toBeInTheDocument();
    expect(screen.getByLabelText('Добавить в избранное')).toBeInTheDocument();
  });

  it('renders favorited button when spot is favorited', () => {
    mockUseFavoriteToggle.mockReturnValue({
      isFavorite: true,
      isLoading: false,
      toggleFavorite: jest.fn(),
    });

    render(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} />
      </TestWrapper>
    );

    expect(screen.getByText('В избранном')).toBeInTheDocument();
    expect(screen.getByLabelText('Удалить из избранного')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    mockUseFavoriteToggle.mockReturnValue({
      isFavorite: false,
      isLoading: true,
      toggleFavorite: jest.fn(),
    });

    render(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} />
      </TestWrapper>
    );

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls toggleFavorite when button is clicked', () => {
    const mockToggleFavorite = jest.fn();
    mockUseFavoriteToggle.mockReturnValue({
      isFavorite: false,
      isLoading: false,
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle callback when provided', () => {
    const mockOnToggle = jest.fn();
    const mockToggleFavorite = jest.fn();
    mockUseFavoriteToggle.mockReturnValue({
      isFavorite: false,
      isLoading: false,
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} onToggle={mockOnToggle} />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledWith(true); // Should be called with opposite of current state
  });

  it('renders with different sizes and variants', () => {
    mockUseFavoriteToggle.mockReturnValue({
      isFavorite: false,
      isLoading: false,
      toggleFavorite: jest.fn(),
    });

    const { rerender } = render(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} size="sm" variant="outline" />
      </TestWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <AddToFavorite spotId={mockSpotId} size="lg" variant="solid" />
      </TestWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
