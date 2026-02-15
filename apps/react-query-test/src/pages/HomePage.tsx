export const HomePage = () => {
  return (
    <div className="page">
      <h2>React Query + Axios + React Router - Демо приложение</h2>

      <div className="info-section">
        <h3>О приложении</h3>
        <p>
          Это тестовое приложение демонстрирует интеграцию:
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li><strong>React Query (@tanstack/react-query)</strong> - для управления серверным состоянием</li>
          <li><strong>Axios</strong> - для HTTP запросов</li>
          <li><strong>React Router</strong> - для навигации</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>Backend API</h3>
        <p>
          Приложение работает с NestJS бэкенд-сервисом <code>guide-app</code> на порту 3000.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Доступные endpoints:
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li><code>GET /routes</code> - список маршрутов</li>
          <li><code>GET /routes/:id</code> - детали маршрута</li>
          <li><code>POST /routes</code> - создание маршрута</li>
          <li><code>DELETE /routes/:id</code> - удаление маршрута</li>
          <li><code>GET /spots</code> - список спотов</li>
          <li><code>GET /spots/search</code> - поиск спотов</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>Основные возможности</h3>
        <div style={{ marginTop: '1rem' }}>
          <h4>React Query:</h4>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Автоматическое кеширование данных</li>
            <li>Фоновое обновление данных (stale time)</li>
            <li>Optimistic updates при мутациях</li>
            <li>Автоматический retry при ошибках</li>
            <li>React Query DevTools для дебага</li>
          </ul>

          <h4 style={{ marginTop: '1rem' }}>Axios:</h4>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Централизованная настройка API клиента</li>
            <li>Request/Response interceptors</li>
            <li>Автоматическая обработка ошибок</li>
            <li>Логирование запросов</li>
          </ul>

          <h4 style={{ marginTop: '1rem' }}>React Router:</h4>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Декларативная навигация</li>
            <li>Динамические роуты с параметрами</li>
            <li>Программная навигация</li>
          </ul>
        </div>
      </div>

      <div className="info-section">
        <h3>Примеры страниц</h3>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li><strong>Routes</strong> - список маршрутов с возможностью удаления</li>
          <li><strong>Create Route</strong> - форма создания нового маршрута</li>
          <li><strong>Spots</strong> - список спотов с пагинацией</li>
          <li><strong>Search Spots</strong> - поиск спотов в реальном времени</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <strong>Примечание:</strong> Убедитесь, что backend сервис guide-app запущен на порту 3000.
      </div>
    </div>
  );
};
