import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : [
        'http://localhost:3001',
        'http://localhost:8080',
        'http://localhost:4202',
        'http://localhost:4200',
        'https://localhost:3001',
        'https://localhost:8080',
        'https://localhost:4202',
        'https://localhost:4200',
      ];

  app.enableCors({
    // @ts-expect-error
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (например, Postman, мобильные приложения)
      if (!origin) return callback(null, true);

      // Проверяем, есть ли origin в списке разрешенных
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      // В development режиме разрешаем все localhost
      if (
        process.env.NODE_ENV === 'development' &&
        origin.includes('localhost')
      ) {
        return callback(null, true);
      }

      // Логируем заблокированные запросы
      console.warn(`CORS blocked request from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'X-API-Key',
    ],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
    maxAge: 86400, // 24 часа
  });

  // Health check endpoint для Kubernetes
  app.getHttpAdapter().get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'guide-app',
    });
  });

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
