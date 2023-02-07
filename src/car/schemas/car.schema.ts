import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import SchemaPlugin from 'src/helpers/schemaPlugin';

import CarFuelDto from '../types/dto/CarFuel.dto';
import CarModelDto from '../types/dto/CarModel.dto';
import CarTransmissionDto from '../types/dto/CarTransmission.dto';
import CarTypeDto from '../types/dto/CarType.dto';
import ColorDto from '../types/dto/Color.dto';
import ProduceCompanyDto from '../types/dto/ProduceCompany.dto';

import ICarDoor from '../types/interfaces/ICarDoor.interface';
import ICarFuel from '../types/interfaces/ICarFuel.interface';
import ICarLuggage from '../types/interfaces/ICarLuggage.interface';
import ICarModel from '../types/interfaces/ICarModel.interface';
import ICarSeat from '../types/interfaces/ICarSeat.interface';
import ICarTransmission from '../types/interfaces/ICarTransmission.interface';
import ICarType from '../types/interfaces/ICarType.interface';
import IColor from '../types/interfaces/IColor.interface';
import IProduceCompany from '../types/interfaces/IProduceCompany.interface';
import IYear from '../types/interfaces/IYear';

export type CarDocument = Car & Document;

@Schema({ timestamps: true })
export class Car {
    @Prop({ type: ProduceCompanyDto })
    produceCompany: IProduceCompany;

    @Prop({ type: CarModelDto })
    carModel: ICarModel;

    @Prop({ type: mSchema.Types.Number })
    produceYear: IYear;

    @Prop({ type: mSchema.Types.Number })
    seats: ICarSeat;

    @Prop({ type: ColorDto })
    color: IColor;

    @Prop({ type: mSchema.Types.Number })
    doors: ICarDoor;

    @Prop({ type: CarFuelDto })
    fuelType: ICarFuel;

    @Prop({ type: mSchema.Types.Number })
    luggage: ICarLuggage;

    @Prop({ type: CarTypeDto })
    carType: ICarType;

    @Prop({ type: CarTransmissionDto })
    transmission: ICarTransmission;

    @Prop()
    carOwnerId: mSchema.Types.ObjectId;

    @Prop({ default: new Date().toISOString() })
    createDateTime: string;

    @Prop({ default: '' })
    lastUpdateDateTime: string;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    createdAt: string;

    @Prop({ default: '' })
    updatedAt: string;
}

const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.plugin(SchemaPlugin);

export { CarSchema };
