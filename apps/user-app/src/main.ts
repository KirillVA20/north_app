import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:8080',
      'http://localhost:4202',
    ],
    credentials: true,
  });

  await app.listen(process.env.USER_APP_PORT ?? 3000);
}
bootstrap();
