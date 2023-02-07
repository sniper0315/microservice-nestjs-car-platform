import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarServiceService from './carService.service';
import CreateCarServiceDto from './dto/createCarService.dto';
import DeleteCarServiceDto from './dto/deleteCarService.dto';
import UpdateCarServiceDto from './dto/updateCarService.dto';
import { getComparator, stableSort } from 'src/helpers/utils';

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
        const all = await this.carServiceService.getAllCarServices();
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
            const carId = item.carId.toString();
            const employeeId = item.employeeId.toString();
            const status = item.status;
            const serviceType = item.serviceType;
            const serviceComment = item.serviceComment;
            const serviceCompany = item.serviceCompany;
            const price = item.price;
            const isDeleted = item.isDeleted;

            return { id, carId, employeeId, status, serviceType, serviceComment, serviceCompany, price, isDeleted, dateTime, metaInfo };
        });

        return newAll;
    }

    @Get('/:carServiceId')
    @ApiOperation({ summary: 'get car service by id' })
    async getSingleCarService(@Param('carServiceId') carServiceId: string) {
        return await this.carServiceService.getSingleCarService(carServiceId);
    }

    @Put('/:carServiceId')
    @ApiOperation({ summary: 'update car service' })
    async updateCarService(@Param('carServiceId') carServiceId: string, @Body() dto: UpdateCarServiceDto) {
        return await this.carServiceService.updateCarService(carServiceId, dto);
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
