import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

import { Car } from 'src/car/schemas/car.schema';
import SchemaPlugin from 'src/helpers/schemaPlugin';
import CarTagDto from '../types/dto/CarTag.dto';
import ICarTag from '../types/interfaces/ICarTag.interface';

export type CarTagDocument = CarTag & Document;

@Schema({ timestamps: true })
export class CarTag {
    @Prop({ required: true, ref: Car.name })
    carId: mSchema.Types.ObjectId;

    @Prop({ type: CarTagDto, default: { value: 'Electro', display: 'Electro' } })
    tagName: ICarTag;

    @Prop({ default: new Date().toISOString() })
    createDateTime: string;

    @Prop({ default: '', type: mSchema.Types.String })
    lastUpdateDateTime: string;

    @Prop({ default: false, type: mSchema.Types.Boolean })
    isDeleted: boolean;

    @Prop()
    createdAt: string;

    @Prop({ default: '' })
    updatedAt: string;
}

const CarTagSchema = SchemaFactory.createForClass(CarTag);

CarTagSchema.plugin(SchemaPlugin);

export { CarTagSchema };
