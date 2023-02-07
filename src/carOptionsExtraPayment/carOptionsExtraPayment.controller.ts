import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import DeleteCarOptionDto from 'src/carOptions/dto/deleteCarOption.dto';
import { getComparator, stableSort } from 'src/helpers/utils';
import CarOptionsExtraPaymentService from './carOptionsExtraPayment.service';
import CreateCarExtraPaymentOptionDto from './dto/createCarExtraPaymentOption.dto';
import UpdateCarExtraPaymentOptionDto from './dto/updateCarExtraPaymentOption.dto';

@Controller('car/option/extrapay')
@ApiTags('carOptionsExtraPayment')
export default class CarOptionsExtraPaymentController {
    constructor(private readonly carOptionsExtraPaymentService: CarOptionsExtraPaymentService) {}

    @Post('/')
    @ApiOperation({ summary: 'create new car extra payment option' })
    async createCarExtraPaymentOption(@Body() dto: CreateCarExtraPaymentOptionDto) {
        return await this.carOptionsExtraPaymentService.createCarExtraPaymentOption(dto);
    }

    @Get('/all')
    @ApiOperation({ summary: 'get all car extra payment options from collection' })
    async getAllCarExtraPaymentOptions() {
        const all = await this.carOptionsExtraPaymentService.getAllCarExtraPaymentOptions();
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
            const price = item.price;
            const isDeleted = item.isDeleted;
            const isActive = item.isActive;

            return { id, carId, optionType, optionDescription, price, isDeleted, isActive, dateTime, metaInfo };
        });

        return newAll;
    }

    @Get('/:carOptionId')
    @ApiOperation({ summary: 'get car extra payment option by id' })
    async getSingleCarOption(@Param('carOptionId') carOptionId: string) {
        return await this.carOptionsExtraPaymentService.getSingleCarExtraPaymentOption(carOptionId);
    }

    @Put('/:carOptionExtraPayId')
    @ApiOperation({ summary: 'update car extra payment option' })
    async updateCarOption(@Param('carOptionExtraPayId') carOptionExtraPayId: string, @Body() dto: UpdateCarExtraPaymentOptionDto) {
        return await this.carOptionsExtraPaymentService.updateCarExtraPaymentOption(carOptionExtraPayId, dto);
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car extra payment option logically' })
    async deleteCarOption(@Res() response, @Body() dto: DeleteCarOptionDto) {
        const message = await this.carOptionsExtraPaymentService.deleteCarExtraPaymentOption(dto);

        return response.json({
            message
        });
    }
}
