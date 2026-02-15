import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { SpotMedia } from './spot-media.schema';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Spot extends Document {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location!: {
    type: 'Point'; // Тип геометрии
    coordinates: [number, number]; // Координаты [долгота, широта]
  }; // GeoJSON формат

  @Prop({ type: String })
  previewImageUrl?: string;

  @Prop({ type: String, required: true })
  userId!: string; // ID пользователя, владельца spot

  @Prop({ type: Number, default: 0, min: 0 })
  rating!: number;

  @Prop({
    type: [
      {
        id: { type: String, required: false },
        coordinates: { type: [Number], required: true },
      },
    ],
    default: [],
  })
  path!: Array<{
    id?: string;
    coordinates: [number, number];
  }>;

  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'SpotMedia' }] })
  //   photos: SpotMedia[];
}

export const SpotSchema = SchemaFactory.createForClass(Spot);
// Создаём 2dsphere индекс для геопоиска
SpotSchema.index({ location: '2dsphere' });
