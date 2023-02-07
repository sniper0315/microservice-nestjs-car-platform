import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarService from './car.service';
import CreateCarDto from './dto/createCar.dto';
import DeleteCarDto from './dto/deleteCar.dto';
import UpdateCarDto from './dto/updateCar.dto';
import { getComparator, stableSort } from 'src/helpers/utils';

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
        const all = await this.carService.getAllCars();
        const sortedAll = stableSort(all, getComparator('desc', 'createDateTime'));
        const newAll = sortedAll.map((item, index) => {
            const dateTime = {
                cretedDateTimeFrom: item.createDateTime,
                cretedDateTimeTo: item.createdAt,
                lastUpdateDateTimeFrom: item.lastUpdateDateTime,
                lastUpdateDateTimeTo: item.updatedAt
            };
            const metaInfo = {
                sortBy: 'createDateTime',
                sortDirection: 'desc',
                offset: index,
                limit: 10
            };
            const id = item._id.toString();
            const produceCompany = item.produceCompany;
            const carModel = item.carModel;
            const produceYear = item.produceYear;
            const seats = item.seats;
            const color = item.color;
            const doors = item.doors;
            const fuelType = item.fuelType;
            const luggage = item.luggage;
            const carType = item.carType;
            const transmission = item.transmission;
            const carOwnerId = item.carOwnerId.toString();
            const isDeleted = item.isDeleted;
            const isActive = item.isActive;

            return { id, produceCompany, carModel, produceYear, seats, color, doors, fuelType, luggage, carType, transmission, carOwnerId, isDeleted, isActive, dateTime, metaInfo };
        });

        return newAll;
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
