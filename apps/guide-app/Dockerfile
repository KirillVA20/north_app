# Используем официальный Node.js образ как базовый
FROM node:20-alpine AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Копируем конфигурационные файлы для всех приложений
COPY apps/guide-app/package.json ./apps/guide-app/
COPY apps/guide-app/tsconfig*.json ./apps/guide-app/
COPY apps/guide-app/webpack.config.js ./apps/guide-app/
COPY apps/guide-app/project.json ./apps/guide-app/

# Устанавливаем зависимости
RUN npm ci --only=production && npm cache clean --force

# Этап сборки
FROM base AS build

# Устанавливаем все зависимости (включая dev)
RUN npm ci

# Копируем исходный код приложения
COPY apps/guide-app/src ./apps/guide-app/src

# Собираем приложение
RUN npx nx build guide-app --prod

# Продакшн этап - оптимизированный для Kubernetes
FROM node:20-alpine AS production

# Устанавливаем необходимые пакеты для Kubernetes
RUN apk add --no-cache dumb-init

# Создаем пользователя для безопасности (не root)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Копируем только необходимые файлы из build этапа
COPY --from=build --chown=nestjs:nodejs /app/dist/apps/guide-app ./dist
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/package*.json ./

# Переключаемся на непривилегированного пользователя
USER nestjs

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные окружения для Kubernetes
ENV NODE_ENV=production
ENV USER_APP_PORT=3000

# Health check для Kubernetes liveness/readiness probes
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Используем dumb-init для правильной обработки сигналов в Kubernetes
ENTRYPOINT ["dumb-init", "--"]

# Запускаем приложение
CMD ["node", "dist/main.js"]
