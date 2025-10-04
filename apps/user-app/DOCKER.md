# Docker для User App

## Описание

Этот документ содержит инструкции по сборке и запуску user-app сервиса с помощью Docker.

## Файлы

- `Dockerfile` - основной файл для сборки Docker образа
- `.dockerignore` - файл исключений для Docker контекста
- `docker-compose.yml` - файл для запуска сервиса с зависимостями

## Сборка образа

### Локальная сборка

```bash
# Из корня монорепозитория
docker build -f apps/user-app/Dockerfile -t user-app:latest .
```

### Сборка с помощью docker-compose

```bash
# Из директории apps/user-app
docker-compose build
```

## Запуск

### Только user-app

```bash
# Из корня монорепозитория
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/north_app \
  -e JWT_SECRET=your-jwt-secret \
  user-app:latest
```

### С зависимостями (MongoDB)

```bash
# Из директории apps/user-app
docker-compose up -d
```

## Переменные окружения

- `NODE_ENV` - окружение (по умолчанию: production)
- `USER_APP_PORT` - порт приложения (по умолчанию: 3000)
- `MONGODB_URI` - строка подключения к MongoDB
- `JWT_SECRET` - секретный ключ для JWT токенов

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f user-app

# Остановка сервисов
docker-compose down

# Пересборка и запуск
docker-compose up --build

# Вход в контейнер
docker exec -it user-app-container sh
```

## Особенности

- Используется многоэтапная сборка для оптимизации размера образа
- Приложение запускается под непривилегированным пользователем для безопасности
- Контекст сборки - корень монорепозитория для доступа к общим зависимостям
- Включен только необходимый код user-app в финальный образ
