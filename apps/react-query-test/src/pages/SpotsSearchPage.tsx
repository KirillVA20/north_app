import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchSpots } from '../hooks/useSpots';

export const SpotsSearchPage = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Дебаунс для поиска (задержка 500мс)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: spots, isLoading, error, isFetching } = useSearchSpots(debouncedQuery);

  return (
    <div className="page">
      <h2>Поиск спотов</h2>

      <div className="info-section">
        <strong>React Query возможности:</strong>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Автоматическое кеширование результатов поиска</li>
          <li>Дебаунс для оптимизации запросов</li>
          <li>Conditional fetching (enabled: query.length {'>'} 0)</li>
          <li>Отдельный кеш для каждого поискового запроса</li>
        </ul>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название спота для поиска..."
        />
        {isFetching && <span style={{ color: '#667eea' }}>🔄 Поиск...</span>}
      </div>

      {query.length > 0 && query === debouncedQuery && (
        <>
          {error && <div className="error">Ошибка: {(error as Error).message}</div>}

          {!isLoading && !error && (
            <>
              {!spots || spots.length === 0 ? (
                <div className="card">
                  <p>По запросу "{query}" ничего не найдено.</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '1rem', color: '#666' }}>
                    Найдено: {spots.length} спот(ов)
                  </div>
                  <div className="grid">
                    {spots.map((spot) => (
                      <div key={spot._id} className="card">
                        <h3>{spot.name}</h3>
                        {spot.description && <p>{spot.description}</p>}

                        <div style={{ marginTop: '1rem' }}>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            <strong>Координаты:</strong><br />
                            [{spot.location.coordinates[0]}, {spot.location.coordinates[1]}]
                          </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <Link to={`/spots/${spot._id}`}>
                            <button className="button">Подробнее</button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

      {query.length === 0 && (
        <div className="card">
          <p>Введите поисковый запрос, чтобы начать поиск спотов.</p>
        </div>
      )}

      <div className="code-block" style={{ marginTop: '2rem' }}>
        <strong>Реализация поиска с дебаунсом:</strong>
        <pre style={{ marginTop: '0.5rem' }}>
{`const [query, setQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

// Дебаунс 500мс
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(query);
  }, 500);
  return () => clearTimeout(timer);
}, [query]);

const { data: spots, isFetching } = useSearchSpots(debouncedQuery);

// useSearchSpots под капотом:
useQuery({
  queryKey: ['spots', 'search', query],
  queryFn: () => spotsApi.search(query),
  enabled: query.length > 0, // выполнить только если есть запрос
  staleTime: 60000, // кеш на 1 минуту
});`}
        </pre>
      </div>
    </div>
  );
};
