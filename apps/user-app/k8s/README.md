# Kubernetes манифесты для User App

## 📁 Структура файлов

- `deployment.yaml` - основной Deployment для приложения
- `service.yaml` - Service для доступа к приложению
- `configmap.yaml` - конфигурационные переменные
- `secret.yaml` - секретные данные (пароли, ключи)
- `ingress.yaml` - Ingress для внешнего доступа
- `hpa.yaml` - Horizontal Pod Autoscaler для автомасштабирования
- `kustomization.yaml` - Kustomize конфигурация

## 🚀 Развертывание

### 1. Подготовка секретов

Обновите `secret.yaml` с вашими реальными значениями:

```bash
# Кодирование значений в base64
echo -n "your-mongo-user" | base64
echo -n "your-mongo-password" | base64
echo -n "your-jwt-secret" | base64
```

### 2. Развертывание с Kustomize

```bash
# Применить все манифесты
kubectl apply -k .

# Или по отдельности
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```

### 3. Проверка развертывания

```bash
# Проверить статус подов
kubectl get pods -l app=user-app

# Проверить сервисы
kubectl get services

# Проверить логи
kubectl logs -l app=user-app

# Проверить Ingress
kubectl get ingress
```

## 🔧 Настройка

### CORS Configuration

CORS настраивается через переменную `CORS_ORIGINS` в ConfigMap:

```yaml
# Production
CORS_ORIGINS: 'https://your-frontend.com,https://your-admin.com'

# Development
CORS_ORIGINS: 'http://localhost:3001,http://localhost:4200'

# Staging
CORS_ORIGINS: 'https://staging-frontend.com,https://staging-admin.com'
```

**Особенности:**

- Поддержка HTTP и HTTPS
- Автоматическое разрешение localhost в development
- Логирование заблокированных запросов
- Поддержка запросов без origin (Postman, мобильные приложения)

### Переменные окружения

**ConfigMap** (несекретные данные):

- `NODE_ENV` - окружение (development/staging/production)
- `USER_APP_PORT` - порт приложения
- `MONGO_HOST` - хост MongoDB
- `MONGO_PORT` - порт MongoDB
- `MONGO_INITDB_DATABASE` - имя базы данных
- `MONGO_AUTHSOURCE` - источник аутентификации
- `CORS_ORIGINS` - разрешенные домены для CORS (через запятую)

**Secret** (секретные данные):

- `mongo-user` - пользователь MongoDB
- `mongo-password` - пароль MongoDB
- `jwt-secret` - секретный ключ JWT

### Ресурсы

- **Requests**: 128Mi RAM, 100m CPU
- **Limits**: 512Mi RAM, 500m CPU

### Автомасштабирование

- **Min replicas**: 2
- **Max replicas**: 10
- **CPU threshold**: 70%
- **Memory threshold**: 80%

## 🏥 Health Checks

Приложение должно иметь endpoint `/health`:

```typescript
// Добавьте в main.ts
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

## 🌐 Доступ к приложению

### Внутренний доступ

```bash
# Port-forward для локального тестирования
kubectl port-forward service/user-app-service 3000:3000
```

### Внешний доступ

- Настройте Ingress Controller (nginx, traefik, etc.)
- Обновите `ingress.yaml` с вашим доменом
- Добавьте DNS запись для `user-app.local`

## 🔍 Мониторинг

```bash
# Статус автомасштабирования
kubectl get hpa user-app-hpa

# Метрики подов
kubectl top pods -l app=user-app

# События
kubectl get events --sort-by=.metadata.creationTimestamp
```

## 🛠️ Полезные команды

```bash
# Перезапуск deployment
kubectl rollout restart deployment/user-app

# Масштабирование
kubectl scale deployment user-app --replicas=5

# Обновление образа
kubectl set image deployment/user-app user-app=user-app:v2.0.0

# Удаление
kubectl delete -k .
```

## 📝 Примечания

1. **MongoDB**: Убедитесь, что MongoDB развернут в кластере или доступен по сети
2. **Ingress**: Настройте Ingress Controller перед применением ingress.yaml
3. **Secrets**: Никогда не коммитьте реальные секреты в Git
4. **Health Check**: Добавьте `/health` endpoint в ваше приложение
5. **CORS**: Настройте CORS для ваших фронтенд доменов
