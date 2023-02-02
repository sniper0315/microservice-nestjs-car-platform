import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import CarModule from './car/car.module';
import CarOptionsModule from './carOptions/carOptions.module';
import CarServiceModule from './carService/carService.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        CarModule,
        CarServiceModule,
        CarOptionsModule
    ],
    controllers: []
})
export class AppModule {}
