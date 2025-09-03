# Использование функциональности избранного для спотов

## Доступные хуки

### Query хуки

- `useFavoriteSpots()` - получение списка избранных спотов
- `useIsSpotFavorite(spotId)` - проверка, является ли спот избранным

### Mutation хуки

- `useAddToFavorites()` - добавление спота в избранное
- `useRemoveFromFavorites()` - удаление спота из избранного

### Удобный хук

- `useFavoriteToggle(spotId)` - переключение статуса избранного для спота

## Компоненты

### Списки спотов

- `UserSpotList` - споты пользователя (использует `useSpotsByUserId`)
- `AllSpotsList` - все споты (использует `useSpots`)
- `FavoriteSpotsList` - избранные споты (использует `useFavoriteSpots`)

## Примеры использования

### Базовое использование хука переключения

```tsx
import { useFavoriteToggle } from '@/enteties/spot';

const SpotCard = ({ spot }) => {
  const { isFavorite, isLoading, toggleFavorite } = useFavoriteToggle(spot.id);

  return (
    <div>
      <h3>{spot.name}</h3>
      <button onClick={toggleFavorite} disabled={isLoading}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};
```

### Использование списка избранных спотов

```tsx
import { FavoriteSpotsList } from '@/widgets/spot-list';

const FavoritesPage = () => {
  return (
    <div>
      <h1>Избранные споты</h1>
      <FavoriteSpotsList onSpotSelect={(spot) => console.log(spot)} />
    </div>
  );
};
```

### Ручное управление избранным

```tsx
import { useAddToFavorites, useRemoveFromFavorites } from '@/enteties/spot';

const CustomSpotActions = ({ spotId }) => {
  const { addToFavorites, isPending: isAdding } = useAddToFavorites();
  const { removeFromFavorites, isPending: isRemoving } = useRemoveFromFavorites();

  return (
    <div>
      <button onClick={() => addToFavorites(spotId)} disabled={isAdding}>
        Добавить в избранное
      </button>
      <button onClick={() => removeFromFavorites(spotId)} disabled={isRemoving}>
        Удалить из избранного
      </button>
    </div>
  );
};
```

## API Endpoints

Все запросы идут на `http://localhost:3002`:

- `POST /favorites/spots/:id` - добавить спот в избранное
- `DELETE /favorites/spots/:id` - удалить спот из избранного
- `GET /favorites/spots` - получить список избранных спотов
- `GET /favorites/spots/:id` - проверить, является ли спот избранным

## Автоматическая инвалидация кэша

При добавлении/удалении из избранного автоматически инвалидируются:

- Список избранных спотов
- Статус избранного для конкретного спота
- Все списки спотов (для обновления статуса в UI)
