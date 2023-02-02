import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarServiceService from './carService.service';
import CreateCarServiceDto from './dto/createCarService.dto';
import DeleteCarServiceDto from './dto/deleteCarService.dto';
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

    @Get('/all')
    @ApiOperation({ summary: 'get all car services from collection' })
    async getAllCarServices() {
        return await this.carServiceService.getAllCarServices();
    }

    @Get('/:carServiceId')
    @ApiOperation({ summary: 'get car service by id' })
    async getSingleCarService(@Param('carServiceId') carServiceId: string) {
        return await this.carServiceService.getSingleCarService(carServiceId);
    }

    @Put('/:serviceId')
    @ApiOperation({ summary: 'update car service' })
    async updateCarService(@Param('serviceId') serviceId: string, @Body() dto: UpdateCarServiceDto) {
        return await this.carServiceService.updateCarService(serviceId, dto);
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car service logically' })
    async deleteCarService(@Res() response, @Body() dto: DeleteCarServiceDto) {
        const message = await this.carServiceService.deleteCarService(dto);

        return response.json({
            message
        });
    }
}
