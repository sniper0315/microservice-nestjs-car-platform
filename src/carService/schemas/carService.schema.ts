import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import CarServiceStatusDto from '../types/dto/CarServiceStatus.dto';
import CarServiceTypeDto from '../types/dto/CarServiceType.dto';
import ICarServiceStatus from '../types/interfaces/ICarServiceStatus.interface';
import ICarServiceType from '../types/interfaces/ICarServiceType.interface';
import { Car } from 'src/car/schemas/car.schema';

export type CarServiceDocument = CarService & Document;

@Schema({ timestamps: true })
export class CarService {
    @Prop({ required: true, ref: Car.name })
    carId: mSchema.Types.ObjectId;

    @Prop({ type: CarServiceStatusDto, default: { value: 'Adding from employee in draft', display: 'Draft' } })
    status: ICarServiceStatus;

    @Prop({ default: new Date().toISOString() })
    createDateTime: string;

    @Prop()
    employeeId: mSchema.Types.ObjectId;

    @Prop({ type: CarServiceTypeDto })
    serviceType: ICarServiceType;

    @Prop({ type: mSchema.Types.String })
    serviceComment: string;

    @Prop({ type: mSchema.Types.String })
    serviceCompany: string;

    @Prop({ type: mSchema.Types.Number })
    price: number;

    @Prop({ default: '', type: mSchema.Types.String })
    lastUpdateDateTime: string;

    @Prop({ default: false, type: mSchema.Types.Boolean })
    isDeleted: boolean;
}

export const CarServiceSchema = SchemaFactory.createForClass(CarService);
