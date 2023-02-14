import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarService from './car.service';
import CreateCarDto from './dto/createCar.dto';
import DeleteCarDto from './dto/deleteCar.dto';
import GetAllCarsDto from './dto/getAll.dto';
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

    @Post('/all')
    @ApiOperation({ summary: 'get all cars from collection' })
    async getAllCars(@Body() dto: GetAllCarsDto) {
        return await this.carService.getAllCars(dto);
    }

    @Get('/:carId')
    @ApiOperation({ summary: 'get car by id' })
    async getSingleCar(@Param('carId') carId: string) {
        return await this.carService.getSingleCar(carId);
    }

    @Put('/:carId')
    @ApiOperation({ summary: 'update car data' })
    async updateCar(@Param('carId') carId: string, @Body() dto: UpdateCarDto) {
        const ret = await this.carService.updateCar(carId, dto);

        return ret ? ret : `Not Found with ${carId}. Please input carId correctly.`;
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car logically' })
    async deleteCar(@Body() dto: DeleteCarDto) {
        await this.carService.deleteCar(dto);

        return 'Successfully removed';
    }
}
