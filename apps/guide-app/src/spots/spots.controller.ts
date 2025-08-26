import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SpotsService } from './spots.service';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Request as ExpressRequest } from 'express';
import { UseAuthGuard } from '../auth/guards/use-auth-guard';

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string;
  };
}

@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotsService) {}

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos', maxCount: 5 }]))
  @UseGuards(UseAuthGuard)
  async createSpot(
    @Body() createSpotDto: CreateSpotDto,
    @Req() req: RequestWithUser
  ) {
    createSpotDto.userId = req.user.id;

    return this.spotService.create(createSpotDto);
  }

  @Put(':id')
  @UseGuards(UseAuthGuard)
  async updateSpot(
    @Param('id') id: string,
    @Body() updateSpotDto: UpdateSpotDto
  ) {
    const spot = await this.spotService.update(id, updateSpotDto);
    if (!spot) {
      throw new HttpException('Spot not found', HttpStatus.NOT_FOUND);
    }
    return spot;
  }

  @Delete(':id')
  @UseGuards(UseAuthGuard)
  async deleteSpot(@Param('id') id: string) {
    const result = await this.spotService.delete(id);
    if (!result) {
      throw new HttpException('Spot not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Spot deleted successfully' };
  }

  @Get()
  async getAllSpots(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return this.spotService.findAll(limit, offset);
  }

  @Get('search')
  async searchSpots(@Query('query') query: string) {
    if (!query)
      throw new HttpException('Query is required', HttpStatus.BAD_REQUEST);
    return this.spotService.searchByName(query);
  }

  @Get('nearby')
  async getNearbySpots(
    @Query('lng') lng: number,
    @Query('lat') lat: number,
    @Query('radius') radius: number
  ) {
    return this.spotService.findNearby(lng, lat, radius);
  }

  @Get(':id')
  async getSpotById(@Param('id') id: string) {
    const spot = await this.spotService.findById(id);
    if (!spot) throw new HttpException('Spot not found', HttpStatus.NOT_FOUND);
    return spot;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSpotDto: UpdateSpotDto) {
    return this.spotService.update(id, updateSpotDto);
  }

  @Get('user/:userId')
  async getSpotsByUserId(@Param('userId') userId: string) {
    return this.spotService.findByUserId(userId);
  }
}
