import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import { Car } from 'src/car/schemas/car.schema';
import CarOptionsDto from 'src/carOptions/types/dto/CarOptions.dto';
import ICarOptions from 'src/carOptions/types/interfaces/ICarOptions.interface';
import SchemaPlugin from 'src/helpers/schemaPlugin';

export type CarOptionsExtraPaymentDocument = CarOptionsExtraPayment & Document;

@Schema({ timestamps: true })
export class CarOptionsExtraPayment {
    @Prop({ required: true, ref: Car.name })
    carId: mSchema.Types.ObjectId;

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

    @Prop()
    createdAt: string;

    @Prop({ default: '' })
    updatedAt: string;
}

const CarOptionsExtraPaymentSchema = SchemaFactory.createForClass(CarOptionsExtraPayment);

CarOptionsExtraPaymentSchema.plugin(SchemaPlugin);

export { CarOptionsExtraPaymentSchema };
