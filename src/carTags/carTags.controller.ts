import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarTagsService from './carTags.service';
import CreateCarTagDto from './dto/createCarTag.dto';
import DeleteCarTagDto from './dto/deleteCarTag.dto';
import GetAllCarTagsDto from './dto/getAll.dto';
import UpdateCarTagDto from './dto/updateCarTag.dto';

@Controller('car/tag')
@ApiTags('carTags')
export default class CarTagsController {
    constructor(private readonly carTagsService: CarTagsService) {}

    @Post('/')
    @ApiOperation({ summary: 'create new car tag' })
    async createCarTag(@Body() dto: CreateCarTagDto) {
        return await this.carTagsService.createCarTag(dto);
    }

    @Post('/all')
    @ApiOperation({ summary: 'get all car tags from collection' })
    async getAllCarTags(@Body() dto: GetAllCarTagsDto) {
        return await this.carTagsService.getAllCarTags(dto);
    }

    @Get('/:carTagId')
    @ApiOperation({ summary: 'get car tag by id' })
    async getSingleCarTag(@Param('carTagId') carTagId: string) {
        return await this.carTagsService.getSingleCarTag(carTagId);
    }

    @Put('/:carTagId')
    @ApiOperation({ summary: 'update car tag' })
    async updateCarTag(@Param('carTagId') carTagId: string, @Body() dto: UpdateCarTagDto) {
        const ret = await this.carTagsService.updateCarTag(carTagId, dto);

        return ret ? ret : `Not Found with ${carTagId}. Please input carTagId correctly.`;
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car tag logically' })
    async deleteCarTag(@Body() dto: DeleteCarTagDto) {
        await this.carTagsService.deleteCarTag(dto);

        return 'Successfully removed';
    }
}
