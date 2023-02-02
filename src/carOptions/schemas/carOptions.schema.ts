import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import { Car } from 'src/car/schemas/car.schema';
import CarOptionsDto from '../types/dto/CarOptions.dto';
import ICarOptions from '../types/interfaces/ICarOptions.interface';

export type CarOptionDocument = CarOption & Document;

@Schema({ timestamps: true })
export class CarOption {
    @Prop({ required: true, ref: Car.name })
    carId: mSchema.Types.ObjectId;

    @Prop({ type: CarOptionsDto })
    optionType: ICarOptions;

    @Prop({ type: mSchema.Types.String })
    optionDescription: string;

    @Prop({ default: new Date().toISOString() })
    createDateTime: string;

    @Prop({ default: '', type: mSchema.Types.String })
    lastUpdateDateTime: string;

    @Prop({ default: false, type: mSchema.Types.Boolean })
    isDeleted: boolean;

    @Prop({ default: true, type: mSchema.Types.Boolean })
    isActive: boolean;
}

export const CarOptionSchema = SchemaFactory.createForClass(CarOption);
