import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarServiceService from './carService.service';
import CreateCarServiceDto from './dto/createCarService.dto';
import DeleteCarServiceDto from './dto/deleteCarService.dto';
import GetAllCarServicesDto from './dto/getAll.dto';
import UpdateCarServiceDto from './dto/updateCarService.dto';

@Controller('car/service')
@ApiTags('carService')
export default class CarServiceController {
    constructor(private readonly carServiceService: CarServiceService) {}

    @Post('/')
    @ApiOperation({ summary: 'create new car service' })
    async createCarService(@Body() dto: CreateCarServiceDto) {
        return await this.carServiceService.createCarService(dto);
    }

    @Post('/all')
    @ApiOperation({ summary: 'get all car services from collection' })
    async getAllCarServices(@Body() dto: GetAllCarServicesDto) {
        return await this.carServiceService.getAllCarServices(dto);
    }

    @Get('/:carServiceId')
    @ApiOperation({ summary: 'get car service by id' })
    async getSingleCarService(@Param('carServiceId') carServiceId: string) {
        return await this.carServiceService.getSingleCarService(carServiceId);
    }

    @Put('/:carServiceId')
    @ApiOperation({ summary: 'update car service' })
    async updateCarService(@Param('carServiceId') carServiceId: string, @Body() dto: UpdateCarServiceDto) {
        const ret = await this.carServiceService.updateCarService(carServiceId, dto);

        return ret ? ret : `Not Found with ${carServiceId}. Please input carServiceId correctly.`;
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car service logically' })
    async deleteCarService(@Body() dto: DeleteCarServiceDto) {
        await this.carServiceService.deleteCarService(dto);

        return 'Successfully removed';
    }
}
