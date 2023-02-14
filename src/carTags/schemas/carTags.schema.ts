import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import CarTagDto from '../types/dto/CarTag.dto';

import ICarTag from '../types/interfaces/ICarTag.interface';

export type CarTagDocument = CarTag & Document;

@Schema({ timestamps: false })
export class CarTag {
    @Prop({ type: mSchema.Types.ObjectId, required: true, ref: 'Car' })
    carId: string;

    @Prop({ type: CarTagDto, default: { value: 'Electro', display: 'Electro' } })
    tagName: ICarTag;

    @Prop({ default: new Date().toISOString() })
    createDateTime: string;

    @Prop({ default: '', type: mSchema.Types.String })
    lastUpdateDateTime: string;

    @Prop({ default: false, type: mSchema.Types.Boolean })
    isDeleted: boolean;
}

const CarTagSchema = SchemaFactory.createForClass(CarTag);

export { CarTagSchema };
