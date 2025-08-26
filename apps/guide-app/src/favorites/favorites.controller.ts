import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Request as ExpressRequest } from 'express';
import { UseAuthGuard } from '../auth/guards/use-auth-guard';

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string;
  };
}

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(UseAuthGuard)
  @Post('spots/:id')
  async addToFavorites(
    @Request() req: RequestWithUser,
    @Param('id') id: string
  ) {
    return this.favoritesService.addToFavorites(req.user.id, id);
  }

  @UseGuards(UseAuthGuard)
  @Delete('spots/:id')
  async removeFromFavorites(
    @Request() req: RequestWithUser,
    @Param('id') id: string
  ) {
    return this.favoritesService.removeFromFavorites(req.user.id, id);
  }

  @UseGuards(UseAuthGuard)
  @Get('spots')
  async getFavorites(@Request() req: RequestWithUser) {
    return this.favoritesService.getFavorites(req.user.id);
  }

  @UseGuards(UseAuthGuard)
  @Get('spots/:id')
  async isFavorite(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.favoritesService.isFavorite(req.user.id, id);
  }

  @UseGuards(UseAuthGuard)
  @Post('routes/:id')
  async addRouteToFavorites(
    @Request() req: RequestWithUser,
    @Param('id') id: string
  ) {
    return this.favoritesService.addRouteToFavorites(req.user.id, id);
  }

  @UseGuards(UseAuthGuard)
  @Delete('routes/:id')
  async removeRouteFromFavorites(
    @Request() req: RequestWithUser,
    @Param('id') id: string
  ) {
    return this.favoritesService.removeRouteFromFavorites(req.user.id, id);
  }

  @UseGuards(UseAuthGuard)
  @Get('routes')
  async getFavoriteRoutes(@Request() req: RequestWithUser) {
    return this.favoritesService.getFavoriteRoutes(req.user.id);
  }

  @UseGuards(UseAuthGuard)
  @Get('routes/:id')
  async isRouteFavorite(
    @Request() req: RequestWithUser,
    @Param('id') id: string
  ) {
    return this.favoritesService.isRouteFavorite(req.user.id, id);
  }
}
