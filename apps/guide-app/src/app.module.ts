import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotsModule } from './spots/spots.module';
import { RoutesModule } from './route/routes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    RoutesModule,
    SpotsModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`,
        authSource: process.env.MONGO_AUTHSOURCE,
        retryAttempts: 5,
        retryDelay: 3000,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
