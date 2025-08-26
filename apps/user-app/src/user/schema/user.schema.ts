import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
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
}

export const UserSchema = SchemaFactory.createForClass(User);

// Индексы для оптимизации запросов
UserSchema.index({ username: 1 }, { unique: true });
