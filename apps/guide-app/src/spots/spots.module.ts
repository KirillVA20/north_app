// Модуль Spots

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotsService } from './spots.service';
import { SpotController } from './spots.controller';
import { Spot, SpotSchema } from './schemas/spot.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
  ],
  controllers: [SpotController],
  providers: [SpotsService],
})
export class SpotsModule {}
