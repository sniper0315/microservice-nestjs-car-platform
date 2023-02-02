import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CarOptionsController from './carOptions.controller';
import CarOptionsService from './carOptions.service';
import { CarOption, CarOptionSchema } from './schemas/carOptions.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CarOption.name, schema: CarOptionSchema }])],
    controllers: [CarOptionsController],
    providers: [CarOptionsService, Logger],
    exports: [CarOptionsService]
})
export default class CarOptionsModule {}
