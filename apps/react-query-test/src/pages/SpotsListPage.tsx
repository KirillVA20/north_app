import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpots } from '../hooks/useSpots';

export const SpotsListPage = () => {
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data: spots, isLoading, error, isFetching } = useSpots(limit, offset);

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  if (isLoading) return <div className="loading">Загрузка спотов...</div>;
  if (error) return <div className="error">Ошибка: {(error as Error).message}</div>;

  return (
    <div className="page">
      <h2>Список спотов</h2>

      <div className="info-section">
        <strong>React Query возможности:</strong>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Пагинация с кешированием каждой страницы</li>
          <li>Индикаторы загрузки (isLoading, isFetching)</li>
          <li>Автоматическое фоновое обновление данных</li>
        </ul>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          Показано спотов: {spots?.length || 0} (offset: {offset}, limit: {limit})
        </div>
        {isFetching && <span style={{ color: '#667eea' }}>🔄 Обновление...</span>}
      </div>

      {!spots || spots.length === 0 ? (
        <div className="card">
          <p>Спотов нет на этой странице.</p>
        </div>
      ) : (
        <div className="grid">
          {spots.map((spot) => (
            <div key={spot._id} className="card">
              <h3>{spot.name}</h3>
              {spot.description && <p>{spot.description}</p>}

              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>Координаты:</strong><br />
                  Lng: {spot.location.coordinates[0]}<br />
                  Lat: {spot.location.coordinates[1]}
                </div>
              </div>

              {spot.media && spot.media.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="badge">{spot.media.length} медиа</span>
                </div>
              )}

              <div style={{ marginTop: '1rem' }}>
                <Link to={`/spots/${spot._id}`}>
                  <button className="button">Подробнее</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="button"
          onClick={handlePrevPage}
          disabled={offset === 0 || isFetching}
        >
          ← Предыдущая
        </button>
        <button
          className="button"
          onClick={handleNextPage}
          disabled={!spots || spots.length < limit || isFetching}
        >
          Следующая →
        </button>
      </div>

      <div className="code-block" style={{ marginTop: '2rem' }}>
        <strong>Используемый хук с пагинацией и Loader:</strong>
        <pre style={{ marginTop: '0.5rem' }}>
{`const [limit] = useState(10);
const [offset, setOffset] = useState(0);

const { data: spots, isLoading, error, isFetching } = useSpots(limit, offset);

// Первая страница предзагружается через loader:
loader: async () => {
  await queryClient.ensureQueryData({
    queryKey: ['spots', 'list', 10, 0],
    queryFn: () => spotsApi.getAll(10, 0),
  });
  return null;
}

// Первая страница готова сразу, остальные загружаются по клику`}
        </pre>
      </div>
    </div>
  );
};
