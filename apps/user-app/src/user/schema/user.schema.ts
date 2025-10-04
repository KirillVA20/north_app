import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: Record<string, any>) => {
      ret.id = ret._id?.toString?.() ?? ret._id;
      if ('_id' in ret) {
        delete ret._id;
      }
      if ('__v' in ret) {
        delete ret.__v;
      }
      return ret;
    },
  },
})
export class User extends Document {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: false })
  firstName!: string;

  @Prop({ required: false })
  lastName!: string;

  @Prop({ required: false })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Индексы для оптимизации запросов
UserSchema.index({ username: 1 }, { unique: true });
