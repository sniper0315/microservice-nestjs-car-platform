import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import { Car } from 'src/car/schemas/car.schema';

import CarOptionsDto from 'src/carOptions/types/dto/CarOptions.dto';

import ICarOptions from 'src/carOptions/types/interfaces/ICarOptions.interface';

export type CarOptionsExtraPaymentDocument = CarOptionsExtraPayment & Document;

@Schema({ timestamps: false })
export class CarOptionsExtraPayment {
    @Prop({ type: mSchema.Types.ObjectId, required: true, ref: Car.name })
    carId: string;

    @Prop({ type: CarOptionsDto })
    optionType: ICarOptions;

    @Prop({ type: mSchema.Types.String })
    optionDescription: string;

    @Prop({ type: mSchema.Types.Number })
    price: number;

    @Prop({ default: new Date().toISOString() })
    createDateTime: string;

    @Prop({ default: '', type: mSchema.Types.String })
    lastUpdateDateTime: string;

    @Prop({ default: false, type: mSchema.Types.Boolean })
    isDeleted: boolean;

    @Prop({ default: true, type: mSchema.Types.Boolean })
    isActive: boolean;
}

const CarOptionsExtraPaymentSchema = SchemaFactory.createForClass(CarOptionsExtraPayment);

export { CarOptionsExtraPaymentSchema };
