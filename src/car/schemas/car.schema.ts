import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ timestamps: true })
export class Car {
  @Prop()
  produceCompany: string;
  @Prop()
  carModel: string;
  @Prop()
  produceYear: string;
  @Prop()
  seats: string;
  @Prop()
  color: string;
  @Prop()
  doors: string;
  @Prop()
  fuelType: string;
  @Prop()
  luggage: string;
  @Prop()
  type: string;
  @Prop()
  transmission: string;
  @Prop()
  carOwnerId: mSchema.Types.ObjectId;
  @Prop()
  createDateTime: string;
  @Prop({ default: '' })
  lastUpdateDateTime: string;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ default: true })
  isActive: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);
