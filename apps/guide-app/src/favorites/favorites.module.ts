import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import {
  UserFavorites,
  UserFavoritesSchema,
} from './schemas/user-favorites.schema';
import { Spot, SpotSchema } from '../spots/schemas/spot.schema';
import { HttpModule } from '@nestjs/axios';
import { Route, RouteSchema } from '../route/schemas/route.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: UserFavorites.name, schema: UserFavoritesSchema },
      { name: Spot.name, schema: SpotSchema },
      { name: Route.name, schema: RouteSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
