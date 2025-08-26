import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:8080',
      'http://localhost:4202',
    ],
    credentials: true,
  });

  await app.listen(process.env.GUIDE_APP_PORT ?? 3000);
}
bootstrap();
