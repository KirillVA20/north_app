# AddToFavorite Feature

Компонент для добавления/удаления спотов из избранного.

## Структура

```
add-to-favorite/
├── ui/
│   └── add-to-favorite-button.tsx  # UI компонент с кнопкой
├── add-to-favorite.tsx             # Основной компонент с бизнес-логикой
├── index.ts                        # Экспорты
├── example-usage.tsx               # Примеры использования
└── README.md                       # Документация
```

## Компоненты

### AddToFavorite

Основной компонент, который:

- Получает `spotId` как пропс
- Использует `useFavoriteToggle` для управления состоянием
- Проверяет статус избранного через `useIsSpotFavorite`
- Предоставляет колбэк `onToggle` для уведомления об изменениях

### AddToFavoriteButton

UI компонент с кнопкой Chakra UI, который:

- Отображает иконку сердца (заполненную/пустую)
- Показывает состояние загрузки
- Поддерживает разные размеры и варианты
- Имеет доступность (aria-label)

## Использование

### Базовое использование

```tsx
import { AddToFavorite } from '@/features/spot/add-to-favorite';

const MyComponent = () => {
  return <AddToFavorite spotId="spot-123" onToggle={(isFavorite) => console.log('Favorite status:', isFavorite)} />;
};
```

### С кастомными параметрами

```tsx
<AddToFavorite
  spotId="spot-123"
  size="lg"
  variant="solid"
  onToggle={(isFavorite) => {
    // Обработка изменения статуса
  }}
/>
```

### В карточке спота

```tsx
import { Card, HStack } from '@chakra-ui/react';
import { AddToFavorite } from '@/features/spot/add-to-favorite';

const SpotCard = ({ spot }) => {
  return (
    <Card>
      <HStack justify="space-between">
        <h3>{spot.name}</h3>
        <AddToFavorite spotId={spot.id} size="sm" />
      </HStack>
    </Card>
  );
};
```

## Пропсы

### AddToFavorite

| Проп       | Тип                               | По умолчанию | Описание                     |
| ---------- | --------------------------------- | ------------ | ---------------------------- |
| `spotId`   | `string`                          | -            | ID спота (обязательный)      |
| `size`     | `'sm' \| 'md' \| 'lg'`            | `'md'`       | Размер кнопки                |
| `variant`  | `'solid' \| 'outline' \| 'ghost'` | `'ghost'`    | Вариант кнопки               |
| `onToggle` | `(isFavorite: boolean) => void`   | -            | Колбэк при изменении статуса |

### AddToFavoriteButton

| Проп         | Тип                               | По умолчанию | Описание           |
| ------------ | --------------------------------- | ------------ | ------------------ |
| `isFavorite` | `boolean`                         | -            | Статус избранного  |
| `isLoading`  | `boolean`                         | -            | Состояние загрузки |
| `onToggle`   | `() => void`                      | -            | Обработчик клика   |
| `size`       | `'sm' \| 'md' \| 'lg'`            | `'md'`       | Размер кнопки      |
| `variant`    | `'solid' \| 'outline' \| 'ghost'` | `'ghost'`    | Вариант кнопки     |

## Особенности

1. **Автоматическая проверка статуса**: Компонент автоматически проверяет, находится ли спот в избранном
2. **Состояние загрузки**: Показывает спиннер во время выполнения запросов
3. **Доступность**: Поддерживает screen readers с aria-label
4. **Визуальная обратная связь**: Иконка сердца меняется в зависимости от статуса
5. **Колбэки**: Предоставляет возможность реагировать на изменения статуса

## Зависимости

- `@chakra-ui/react` - для UI компонентов
- `lucide-react` - для иконки сердца
- `@/enteties/spot` - для хуков работы с избранным
