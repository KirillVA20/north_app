import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spot } from './schemas/spot.schema';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

@Injectable()
export class SpotsService {
  constructor(@InjectModel(Spot.name) private spotModel: Model<Spot>) {}

  async create(createSpotDto: CreateSpotDto): Promise<Spot> {
    const spotData: Partial<Spot> = {
      ...createSpotDto,
      location: {
        type: 'Point',
        coordinates: [createSpotDto.lng, createSpotDto.lat],
      },
    };

    const spot = new this.spotModel(spotData);
    return spot.save();
  }

  async update(id: string, updateSpotDto: UpdateSpotDto): Promise<Spot | null> {
    const updateData: Partial<Spot> = { ...updateSpotDto };

    if (updateSpotDto.lng && updateSpotDto.lat) {
      updateData.location = {
        type: 'Point',
        coordinates: [updateSpotDto.lng, updateSpotDto.lat],
      };
    }

    return this.spotModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.spotModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async findAll(limit: number, offset: number): Promise<Spot[]> {
    return this.spotModel.find().skip(offset).limit(limit).exec();
  }

  async searchByName(query: string): Promise<Spot[]> {
    return this.spotModel
      .find({ name: { $regex: query, $options: 'i' } })
      .exec();
  }

  async findNearby(lng: number, lat: number, radius: number): Promise<Spot[]> {
    return this.spotModel
      .find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: radius,
          },
        },
      })
      .exec();
  }

  async findById(id: string): Promise<Spot | null> {
    return this.spotModel.findById(id).exec();
  }
  async findByUserId(userId: string): Promise<Spot[]> {
    return this.spotModel.find({ userId }).exec();
  }
}
