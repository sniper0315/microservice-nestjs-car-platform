import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarOptionsService from './carOptions.service';
import CreateCarOptionDto from './dto/createCarOption.dto';
import DeleteCarOptionDto from './dto/deleteCarOption.dto';
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

    @Get('/all')
    @ApiOperation({ summary: 'get all car options from collection' })
    async getAllCarOptions() {
        return await this.carOptionsService.getAllCarOptions();
    }

    @Get('/:carOptionId')
    @ApiOperation({ summary: 'get car option by id' })
    async getSingleCarOption(@Param('carOptionId') carOptionId: string) {
        return await this.carOptionsService.getSingleCarOption(carOptionId);
    }

    @Put('/:carOptionId')
    @ApiOperation({ summary: 'update car option' })
    async updateCarOption(@Param('carOptionId') carOptionId: string, @Body() dto: UpdateCarOptionDto) {
        return await this.carOptionsService.updateCarOption(carOptionId, dto);
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car option logically' })
    async deleteCarOption(@Res() response, @Body() dto: DeleteCarOptionDto) {
        const message = await this.carOptionsService.deleteCarOption(dto);

        return response.json({
            message
        });
    }
}
