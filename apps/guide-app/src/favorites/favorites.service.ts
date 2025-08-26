import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFavorites } from './schemas/user-favorites.schema';
import { Spot } from '../spots/schemas/spot.schema';
import { Route } from '../route/schemas/route.schema';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(UserFavorites.name)
    private readonly userFavoritesModel: Model<UserFavorites>,
    @InjectModel(Spot.name)
    private readonly spotModel: Model<Spot>,
    @InjectModel(Route.name)
    private readonly routeModel: Model<Route>
  ) {}

  async addToFavorites(userId: string, spotId: string): Promise<UserFavorites> {
    const spot = await this.spotModel.findById(spotId);
    if (!spot) {
      throw new Error('Spot not found');
    }

    return this.userFavoritesModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { spots: spotId } },
        { upsert: true, new: true }
      )
      .exec();
  }

  async removeFromFavorites(
    userId: string,
    spotId: string
  ): Promise<UserFavorites> {
    const result = await this.userFavoritesModel
      .findOneAndUpdate({ userId }, { $pull: { spots: spotId } }, { new: true })
      .exec();

    if (!result) {
      throw new Error('Favorites not found');
    }

    return result;
  }

  async getFavorites(userId: string) {
    const favorites = await this.userFavoritesModel.findOne({ userId });
    if (!favorites) {
      return { spots: [] };
    }

    const spots = await this.spotModel.find({
      _id: { $in: favorites.spots },
    });

    return { spots };
  }

  async isFavorite(userId: string, spotId: string): Promise<boolean> {
    const favorites = await this.userFavoritesModel.findOne({
      userId,
      spots: spotId,
    });
    return !!favorites;
  }

  async addRouteToFavorites(
    userId: string,
    routeId: string
  ): Promise<UserFavorites> {
    const route = await this.routeModel.findById(routeId);
    if (!route) {
      throw new Error('Route not found');
    }

    const result = await this.userFavoritesModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { routes: routeId } },
        { upsert: true, new: true }
      )
      .exec();

    if (!result) {
      throw new Error('Failed to add route to favorites');
    }

    return result;
  }

  async removeRouteFromFavorites(
    userId: string,
    routeId: string
  ): Promise<UserFavorites> {
    const result = await this.userFavoritesModel
      .findOneAndUpdate(
        { userId },
        { $pull: { routes: routeId } },
        { new: true }
      )
      .exec();

    if (!result) {
      throw new Error('Favorites not found');
    }

    return result;
  }

  async getFavoriteRoutes(userId: string) {
    const favorites = await this.userFavoritesModel.findOne({ userId });
    if (!favorites) {
      return { routes: [] };
    }

    const routes = await this.routeModel.find({
      _id: { $in: favorites.routes },
    });

    return { routes };
  }

  async isRouteFavorite(userId: string, routeId: string): Promise<boolean> {
    const favorites = await this.userFavoritesModel.findOne({
      userId,
      routes: routeId,
    });
    return !!favorites;
  }
}
