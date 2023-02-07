import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CarOptionsExtraPaymentController from './carOptionsExtraPayment.controller';
import CarOptionsExtraPaymentService from './carOptionsExtraPayment.service';
import { CarOptionsExtraPayment, CarOptionsExtraPaymentSchema } from './schemas/carOptionsExtraPayment.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CarOptionsExtraPayment.name, schema: CarOptionsExtraPaymentSchema }])],
    controllers: [CarOptionsExtraPaymentController],
    providers: [CarOptionsExtraPaymentService, Logger],
    exports: [CarOptionsExtraPaymentService]
})
export default class CarOptionsExtraPaymentModule {}
