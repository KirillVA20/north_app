import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from './schemas/route.schema';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const createdRoute = new this.routeModel(createRouteDto);
    return createdRoute.save();
  }

  async delete(id: string): Promise<Route | null> {
    return this.routeModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateRouteDto: UpdateRouteDto,
  ): Promise<Route | null> {
    return this.routeModel
      .findByIdAndUpdate(id, updateRouteDto, { new: true })
      .exec();
  }

  async findById(id: string): Promise<Route | null> {
    return this.routeModel.findById(id).exec();
  }

  async findAll(): Promise<Route[]> {
    return this.routeModel.find().exec();
  }
}
