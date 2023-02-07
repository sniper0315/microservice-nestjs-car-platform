import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import CarOptionsService from './carOptions.service';
import CreateCarOptionDto from './dto/createCarOption.dto';
import DeleteCarOptionDto from './dto/deleteCarOption.dto';
import UpdateCarOptionDto from './dto/updateCarOption.dto';
import { getComparator, stableSort } from 'src/helpers/utils';

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
        const all = await this.carOptionsService.getAllCarOptions();
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
            const optionType = item.optionType;
            const optionDescription = item.optionDescription;
            const isDeleted = item.isDeleted;
            const isActive = item.isActive;

            return { id, carId, optionType, optionDescription, isDeleted, isActive, dateTime, metaInfo };
        });

        return newAll;
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
