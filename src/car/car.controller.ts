import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarService from './car.service';
import CreateCarDto from './dto/createCar.dto';
import DeleteCarDto from './dto/deleteCar.dto';
import UpdateCarDto from './dto/updateCar.dto';

@Controller('car')
@ApiTags('car')
export default class CarController {
    constructor(private readonly carService: CarService) {}

    @Post()
    @ApiOperation({ summary: 'create new car' })
    async createCar(@Body() dto: CreateCarDto) {
        return await this.carService.createCar(dto);
    }

    @Get('/all')
    @ApiOperation({ summary: 'get all cars from collection' })
    async getAllCars() {
        return await this.carService.getAllCars();
    }

    @Get('/:carId')
    @ApiOperation({ summary: 'get car by id' })
    async getSingleCar(@Param('carId') carId: string) {
        return await this.carService.getSingleCar(carId);
    }

    @Put('/:carId')
    @ApiOperation({ summary: 'update car data' })
    async updateCar(@Param('carId') carId: string, @Body() dto: UpdateCarDto) {
        return await this.carService.updateCar(carId, dto);
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car logically' })
    async deleteCar(@Res() response, @Body() dto: DeleteCarDto) {
        const message = await this.carService.deleteCar(dto);

        return response.json({
            message
        });
    }
}
