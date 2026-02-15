import { useParams, Link } from 'react-router-dom';
import { useSpot } from '../hooks/useSpots';

export const SpotDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: spot, isLoading, error } = useSpot(id!);

  if (isLoading) return <div className="loading">Загрузка спота...</div>;
  if (error) return <div className="error">Ошибка: {(error as Error).message}</div>;
  if (!spot) return <div className="error">Спот не найден</div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/spots">← Назад к списку</Link>
      </div>

      <h2>{spot.name}</h2>

      {spot.description && (
        <p style={{ color: '#666', marginTop: '1rem' }}>{spot.description}</p>
      )}

      <div className="info-section">
        <strong>Детали спота:</strong>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>ID: <code>{spot._id}</code></li>
          <li>User ID: <code>{spot.userId}</code></li>
          <li>Координаты: [{spot.location.coordinates[0]}, {spot.location.coordinates[1]}]</li>
          <li>Создан: {new Date(spot.createdAt).toLocaleString('ru-RU')}</li>
          <li>Обновлен: {new Date(spot.updatedAt).toLocaleString('ru-RU')}</li>
        </ul>
      </div>

      {spot.media && spot.media.length > 0 && (
        <>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Медиа</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {spot.media.map((media, index) => (
              <div key={index} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="badge">{media.type}</span>
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#667eea' }}
                  >
                    {media.url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="code-block" style={{ marginTop: '2rem' }}>
        <strong>Используемый хук с Loader предзагрузкой:</strong>
        <pre style={{ marginTop: '0.5rem' }}>
{`const { id } = useParams<{ id: string }>();
const { data: spot, isLoading, error } = useSpot(id!);

// Данные предзагружаются через React Router loader:
loader: async ({ params }) => {
  await queryClient.ensureQueryData({
    queryKey: ['spots', params.id],
    queryFn: () => spotsApi.getById(params.id!),
  });
  return null;
}

// Страница открывается мгновенно с данными!`}
        </pre>
      </div>
    </div>
  );
};
