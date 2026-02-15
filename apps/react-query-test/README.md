# React Query + Axios + React Router - Demo App

Тестовое приложение для изучения связки **React Query**, **Axios** и **React Router** с использованием backend API из `guide-app`.

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **React Query (@tanstack/react-query)** - управление серверным состоянием
- **Axios** - HTTP клиент
- **React Router** - маршрутизация
- **Vite** - сборщик

## Структура проекта

```
src/
├── api/              # API функции (routes, spots)
├── hooks/            # React Query хуки
├── lib/              # Axios instance с interceptors
├── pages/            # Страницы приложения
├── types/            # TypeScript типы
├── App.tsx           # Главный компонент с роутингом
└── main.tsx          # Точка входа
```

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Убедитесь, что backend `guide-app` запущен на порту 3000

4. Запустите приложение:
```bash
npm run dev
```

Приложение откроется на [http://localhost:4200](http://localhost:4200)

## Основные возможности

### React Query

- **Автоматическое кеширование** - данные кешируются по query keys
- **Stale time** - управление свежестью данных (30-60 секунд)
- **Автоматический retry** - повторные попытки при ошибках
- **Optimistic updates** - мгновенное обновление UI
- **Cache invalidation** - автоматическая инвалидация после мутаций
- **Background refetching** - фоновое обновление данных
- **DevTools** - инструменты для дебага (откройте с помощью иконки внизу слева)

### Axios

- **Centralized configuration** - единая точка настройки API
- **Request interceptors** - логирование запросов
- **Response interceptors** - обработка ошибок
- **TypeScript типизация** - полная типизация запросов и ответов

### React Router

- **Декларативная навигация** - использование Link компонента
- **Динамические роуты** - параметры в URL (например `/routes/:id`)
- **Программная навигация** - useNavigate для редиректов

## Примеры страниц

### Routes
- **[/routes](http://localhost:4200/routes)** - список маршрутов
  - Демонстрация: useQuery, кеширование, удаление
- **[/routes/create](http://localhost:4200/routes/create)** - создание маршрута
  - Демонстрация: useMutation, формы, инвалидация кеша
- **[/routes/:id](http://localhost:4200/routes/:id)** - детали маршрута
  - Демонстрация: динамические роуты, useParams

### Spots
- **[/spots](http://localhost:4200/spots)** - список спотов
  - Демонстрация: пагинация, кеширование страниц
- **[/spots/search](http://localhost:4200/spots/search)** - поиск спотов
  - Демонстрация: дебаунс, conditional fetching, отдельный кеш для поисков
- **[/spots/:id](http://localhost:4200/spots/:id)** - детали спота

## Примеры использования

### Query (получение данных)

```tsx
import { useRoutes } from '../hooks/useRoutes';

const { data: routes, isLoading, error } = useRoutes();
```

### Mutation (изменение данных)

```tsx
import { useCreateRoute } from '../hooks/useRoutes';

const createRoute = useCreateRoute();

await createRoute.mutateAsync({
  name: 'Новый маршрут',
  points: [...]
});
```

### Поиск с дебаунсом

```tsx
const [query, setQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(query);
  }, 500);
  return () => clearTimeout(timer);
}, [query]);

const { data: spots } = useSearchSpots(debouncedQuery);
```

### Пагинация

```tsx
const [offset, setOffset] = useState(0);
const { data: spots } = useSpots(10, offset);

// Каждая страница кешируется отдельно!
```

## Backend API Endpoints

Приложение работает со следующими endpoints из `guide-app`:

### Routes
- `GET /routes` - список маршрутов
- `GET /routes/:id` - детали маршрута
- `POST /routes` - создание маршрута
- `DELETE /routes/:id` - удаление маршрута

### Spots
- `GET /spots?limit=10&offset=0` - список спотов с пагинацией
- `GET /spots/:id` - детали спота
- `GET /spots/search?query=...` - поиск по названию
- `GET /spots/nearby?lng=...&lat=...&radius=...` - поиск ближайших
- `POST /spots/create` - создание спота (требует авторизации)
- `PUT /spots/:id` - обновление спота (требует авторизации)
- `DELETE /spots/:id` - удаление спота (требует авторизации)

## Полезные команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Preview сборки
npm run preview

# Линтинг
npm run lint
```

## React Query DevTools

В приложении подключены React Query DevTools. Откройте панель разработки (иконка внизу слева), чтобы:

- Просматривать все queries и их состояния
- Видеть кешированные данные
- Отслеживать время жизни кеша (stale/fresh)
- Вручную инвалидировать запросы
- Просматривать mutations

## Архитектурные решения

### Query Keys
Используется структурированный подход к query keys:
```ts
export const routeKeys = {
  all: ['routes'] as const,
  detail: (id: string) => ['routes', id] as const,
};
```

### Axios Instance
Централизованная настройка с interceptors:
```ts
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  }
);
```

### Custom Hooks
Переиспользуемые хуки для каждого ресурса:
```ts
export const useRoutes = () => {
  return useQuery({
    queryKey: routeKeys.all,
    queryFn: routesApi.getAll,
    staleTime: 30000,
  });
};
```

## Дальнейшее развитие

Идеи для расширения примеров:

- Infinite scroll с useInfiniteQuery
- Optimistic updates при создании/удалении
- Prefetching данных при hover
- Мутации с rollback при ошибках
- SSR с React Query (Next.js)
- Работа с WebSocket и subscriptions

## Лицензия

MIT
