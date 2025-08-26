import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Route extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description!: string;

  @Prop({
    type: [
      {
        coordinates: {
          type: [Number],
          required: true,
        },
        photo: String,
        description: String,
      },
    ],
    required: true,
  })
  points!: {
    coordinates: [number, number];
    photo: string;
    description: string;
  }[];
}

export const RouteSchema = SchemaFactory.createForClass(Route);
