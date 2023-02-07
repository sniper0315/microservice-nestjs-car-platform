import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CarTagsController from './carTags.controller';
import CarTagsService from './carTags.service';
import { CarTag, CarTagSchema } from './schemas/carTags.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CarTag.name, schema: CarTagSchema }])],
    controllers: [CarTagsController],
    providers: [CarTagsService, Logger],
    exports: [CarTagsService]
})
export default class CarTagsModule {}
