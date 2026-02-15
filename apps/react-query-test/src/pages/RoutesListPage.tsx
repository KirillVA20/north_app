import { Link } from 'react-router-dom';
import { useRoutes, useDeleteRoute } from '../hooks/useRoutes';

export const RoutesListPage = () => {
  const { data: routes, isLoading, error } = useRoutes();
  const deleteRoute = useDeleteRoute();

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Удалить маршрут "${name}"?`)) return;

    try {
      await deleteRoute.mutateAsync(id);
      alert('Маршрут удален!');
    } catch (err) {
      alert('Ошибка при удалении маршрута');
      console.error(err);
    }
  };

  if (isLoading) return <div className="loading">Загрузка маршрутов...</div>;
  if (error) return <div className="error">Ошибка: {(error as Error).message}</div>;

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Список маршрутов</h2>
        <Link to="/routes/create">
          <button className="button">+ Создать маршрут</button>
        </Link>
      </div>

      <div className="info-section">
        <strong>React Query возможности:</strong>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Автоматическое кеширование списка маршрутов</li>
          <li>Состояния загрузки и ошибок</li>
          <li>Автоматическая инвалидация кеша после мутаций</li>
        </ul>
      </div>

      {!routes || routes.length === 0 ? (
        <div className="card">
          <p>Маршрутов пока нет. <Link to="/routes/create">Создайте первый!</Link></p>
        </div>
      ) : (
        <div className="grid">
          {routes.map((route) => (
            <div key={route._id} className="card">
              <h3>{route.name}</h3>
              {route.description && <p>{route.description}</p>}

              <div style={{ marginTop: '1rem' }}>
                <span className="badge">{route.points.length} точек</span>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Link to={`/routes/${route._id}`}>
                  <button className="button">Подробнее</button>
                </Link>
                <button
                  className="button button-danger"
                  onClick={() => handleDelete(route._id, route.name)}
                  disabled={deleteRoute.isPending}
                >
                  {deleteRoute.isPending ? 'Удаление...' : 'Удалить'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="code-block" style={{ marginTop: '2rem' }}>
        <strong>Используемый хук с Loader предзагрузкой:</strong>
        <pre style={{ marginTop: '0.5rem' }}>
{`const { data: routes, isLoading, error } = useRoutes();

// Данные предзагружаются через React Router loader:
loader: async () => {
  await queryClient.ensureQueryData({
    queryKey: ['routes'],
    queryFn: routesApi.getAll,
    staleTime: 30000,
  });
  return null;
}

// При первом рендере isLoading = false, данные уже в кеше!`}
        </pre>
      </div>
    </div>
  );
};
