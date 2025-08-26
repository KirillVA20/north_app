import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserFavorites extends Document {
  @Prop({ type: String, required: true })
  userId!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Spot' }], default: [] })
  favoriteSpots!: Types.ObjectId[];
}

export const UserFavoritesSchema = SchemaFactory.createForClass(UserFavorites);
UserFavoritesSchema.index({ userId: 1 }, { unique: true });
