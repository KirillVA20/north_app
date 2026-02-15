import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateRoute } from '../hooks/useRoutes';
import { Point } from '../types';

export const CreateRoutePage = () => {
  const navigate = useNavigate();
  const createRoute = useCreateRoute();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState<Point[]>([
    { coordinates: [0, 0] },
    { coordinates: [0, 0] },
  ]);

  const handleAddPoint = () => {
    setPoints([...points, { coordinates: [0, 0] }]);
  };

  const handleRemovePoint = (index: number) => {
    if (points.length <= 2) {
      alert('Маршрут должен иметь минимум 2 точки');
      return;
    }
    setPoints(points.filter((_, i) => i !== index));
  };

  const handlePointChange = (index: number, field: 'lng' | 'lat' | 'description', value: string) => {
    const newPoints = [...points];
    if (field === 'lng') {
      newPoints[index].coordinates[0] = parseFloat(value) || 0;
    } else if (field === 'lat') {
      newPoints[index].coordinates[1] = parseFloat(value) || 0;
    } else {
      newPoints[index].description = value;
    }
    setPoints(newPoints);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Введите название маршрута');
      return;
    }

    if (points.length < 2) {
      alert('Маршрут должен иметь минимум 2 точки');
      return;
    }

    try {
      await createRoute.mutateAsync({
        name,
        description: description || undefined,
        points,
      });
      alert('Маршрут создан!');
      navigate('/routes');
    } catch (err) {
      alert('Ошибка при создании маршрута');
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/routes">← Назад к списку</Link>
      </div>

      <h2>Создать новый маршрут</h2>

      <div className="info-section">
        <strong>React Query Mutation:</strong>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Автоматическая инвалидация кеша после успешного создания</li>
          <li>Обработка состояний загрузки и ошибок</li>
          <li>Поддержка optimistic updates</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Название маршрута *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Маршрут по центру города"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание маршрута"
          />
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>Точки маршрута</h3>

        {points.map((point, index) => (
          <div key={index} className="card" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4>Точка {index + 1}</h4>
              {points.length > 2 && (
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => handleRemovePoint(index)}
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Удалить
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Долгота (lng)</label>
                <input
                  type="number"
                  step="any"
                  value={point.coordinates[0]}
                  onChange={(e) => handlePointChange(index, 'lng', e.target.value)}
                  placeholder="Например: 37.6173"
                />
              </div>

              <div className="form-group">
                <label>Широта (lat)</label>
                <input
                  type="number"
                  step="any"
                  value={point.coordinates[1]}
                  onChange={(e) => handlePointChange(index, 'lat', e.target.value)}
                  placeholder="Например: 55.7558"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Описание точки</label>
              <input
                type="text"
                value={point.description || ''}
                onChange={(e) => handlePointChange(index, 'description', e.target.value)}
                placeholder="Например: Красная площадь"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="button"
          onClick={handleAddPoint}
          style={{ marginTop: '1rem' }}
        >
          + Добавить точку
        </button>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            className="button"
            disabled={createRoute.isPending}
          >
            {createRoute.isPending ? 'Создание...' : 'Создать маршрут'}
          </button>
          <Link to="/routes">
            <button type="button" className="button" style={{ background: '#999' }}>
              Отмена
            </button>
          </Link>
        </div>
      </form>

      <div className="code-block" style={{ marginTop: '2rem' }}>
        <strong>Используемый хук:</strong>
        <pre style={{ marginTop: '0.5rem' }}>
{`const createRoute = useCreateRoute();

// Создание маршрута:
await createRoute.mutateAsync({
  name,
  description,
  points,
});

// Автоматическая инвалидация кеша:
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['routes'] });
}`}
        </pre>
      </div>
    </div>
  );
};
