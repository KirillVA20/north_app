import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRoute, useDeleteRoute } from '../hooks/useRoutes';

export const RouteDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: route, isLoading, error } = useRoute(id!);
  const deleteRoute = useDeleteRoute();

  const handleDelete = async () => {
    if (!window.confirm(`Удалить маршрут "${route?.name}"?`)) return;

    try {
      await deleteRoute.mutateAsync(id!);
      alert('Маршрут удален!');
      navigate('/routes');
    } catch (err) {
      alert('Ошибка при удалении');
      console.error(err);
    }
  };

  if (isLoading) return <div className="loading">Загрузка маршрута...</div>;
  if (error) return <div className="error">Ошибка: {(error as Error).message}</div>;
  if (!route) return <div className="error">Маршрут не найден</div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/routes">← Назад к списку</Link>
      </div>

      <h2>{route.name}</h2>

      {route.description && (
        <p style={{ color: '#666', marginTop: '1rem' }}>{route.description}</p>
      )}

      <div className="info-section">
        <strong>Детали маршрута:</strong>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>ID: <code>{route._id}</code></li>
          <li>Количество точек: {route.points.length}</li>
          <li>Создан: {new Date(route.createdAt).toLocaleString('ru-RU')}</li>
          <li>Обновлен: {new Date(route.updatedAt).toLocaleString('ru-RU')}</li>
        </ul>
      </div>

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Точки маршрута</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {route.points.map((point, index) => (
          <div key={index} className="card">
            <h4>Точка {index + 1}</h4>
            <p><strong>Координаты:</strong> [{point.coordinates[0]}, {point.coordinates[1]}]</p>
            {point.description && <p><strong>Описание:</strong> {point.description}</p>}
            {point.photo && <p><strong>Фото:</strong> {point.photo}</p>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          className="button button-danger"
          onClick={handleDelete}
          disabled={deleteRoute.isPending}
        >
          {deleteRoute.isPending ? 'Удаление...' : 'Удалить маршрут'}
        </button>
      </div>

      <div className="code-block" style={{ marginTop: '2rem' }}>
        <strong>Используемый хук с Loader предзагрузкой:</strong>
        <pre style={{ marginTop: '0.5rem' }}>
{`const { id } = useParams<{ id: string }>();
const { data: route, isLoading, error } = useRoute(id!);

// Данные предзагружаются через React Router loader:
loader: async ({ params }) => {
  await queryClient.ensureQueryData({
    queryKey: ['routes', params.id],
    queryFn: () => routesApi.getById(params.id!),
  });
  return null;
}

// Нет мигания "Загрузка..." - данные уже готовы!`}
        </pre>
      </div>
    </div>
  );
};
