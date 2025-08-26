import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';

import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RoutesService } from './route.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.routesService.delete(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.routesService.findById(id);
  }

  @Get()
  async findAll() {
    return this.routesService.findAll();
  }
}
