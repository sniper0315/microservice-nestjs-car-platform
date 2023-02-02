import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CarServiceController from './carService.controller';
import CarServiceService from './carService.service';
import { CarService, CarServiceSchema } from './schemas/carService.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CarService.name, schema: CarServiceSchema }])],
    controllers: [CarServiceController],
    providers: [CarServiceService, Logger],
    exports: [CarServiceService]
})
export default class CarServiceModule {}
