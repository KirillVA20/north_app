import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Spot } from './spot.schema';

@Schema()
export class SpotMedia extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ type: Types.ObjectId, ref: 'Spot' })
  spot: Spot;
}
