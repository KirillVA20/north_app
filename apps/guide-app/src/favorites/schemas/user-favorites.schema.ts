import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserFavorites extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop({ type: [Types.ObjectId], ref: 'Spot' })
  spots!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Route' })
  routes!: Types.ObjectId[];
}

export const UserFavoritesSchema = SchemaFactory.createForClass(UserFavorites);
