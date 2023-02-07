import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import CarModule from './car/car.module';
import CarOptionsModule from './carOptions/carOptions.module';
import CarOptionsExtraPaymentModule from './carOptionsExtraPayment/carOptionsExtraPayment.module';
import CarServiceModule from './carService/carService.module';
import CarTagsModule from './carTags/carTags.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        CarModule,
        CarServiceModule,
        CarOptionsModule,
        CarOptionsExtraPaymentModule,
        CarTagsModule
    ],
    controllers: []
})
export class AppModule {}
