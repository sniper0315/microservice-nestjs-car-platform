import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarOptionsService from './carOptions.service';
import CreateCarOptionDto from './dto/createCarOption.dto';
import DeleteCarOptionDto from './dto/deleteCarOption.dto';
import GetAllCarOptionsDto from './dto/getAll.dto';
import UpdateCarOptionDto from './dto/updateCarOption.dto';

@Controller('car/option')
@ApiTags('carOptions')
export default class CarOptionsController {
    constructor(private readonly carOptionsService: CarOptionsService) {}

    @Post('/')
    @ApiOperation({ summary: 'create new car option' })
    async createCarOption(@Body() dto: CreateCarOptionDto) {
        return await this.carOptionsService.createCarOption(dto);
    }

    @Post('/all')
    @ApiOperation({ summary: 'get all car options from collection' })
    async getAllCarOptions(@Body() dto: GetAllCarOptionsDto) {
        return await this.carOptionsService.getAllCarOptions(dto);
    }

    @Get('/:carOptionId')
    @ApiOperation({ summary: 'get car option by id' })
    async getSingleCarOption(@Param('carOptionId') carOptionId: string) {
        return await this.carOptionsService.getSingleCarOption(carOptionId);
    }

    @Put('/:carOptionId')
    @ApiOperation({ summary: 'update car option' })
    async updateCarOption(@Param('carOptionId') carOptionId: string, @Body() dto: UpdateCarOptionDto) {
        const ret = await this.carOptionsService.updateCarOption(carOptionId, dto);

        return ret ? ret : `Not Found with ${carOptionId}. Please input carOptionId correctly.`;
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car option logically' })
    async deleteCarOption(@Body() dto: DeleteCarOptionDto) {
        await this.carOptionsService.deleteCarOption(dto);

        return 'Successfully removed';
    }
}
