import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import DeleteCarOptionDto from 'src/carOptions/dto/deleteCarOption.dto';
import CarOptionsExtraPaymentService from './carOptionsExtraPayment.service';
import CreateCarExtraPaymentOptionDto from './dto/createCarExtraPaymentOption.dto';
import GetAllCarExtraPaymentOptionsDto from './dto/getAll.dto';
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

    @Post('/all')
    @ApiOperation({ summary: 'get all car extra payment options from collection' })
    async getAllCarExtraPaymentOptions(@Body() dto: GetAllCarExtraPaymentOptionsDto) {
        return await this.carOptionsExtraPaymentService.getAllCarExtraPaymentOptions(dto);
    }

    @Get('/:carOptionId')
    @ApiOperation({ summary: 'get car extra payment option by id' })
    async getSingleCarOption(@Param('carOptionId') carOptionId: string) {
        return await this.carOptionsExtraPaymentService.getSingleCarExtraPaymentOption(carOptionId);
    }

    @Put('/:carOptionExtraPayId')
    @ApiOperation({ summary: 'update car extra payment option' })
    async updateCarOption(@Param('carOptionExtraPayId') carOptionExtraPayId: string, @Body() dto: UpdateCarExtraPaymentOptionDto) {
        const ret = await this.carOptionsExtraPaymentService.updateCarExtraPaymentOption(carOptionExtraPayId, dto);

        return ret ? ret : `Not Found with ${carOptionExtraPayId}. Please input carOptionExtraPayId correctly.`;
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car extra payment option logically' })
    async deleteCarOption(@Body() dto: DeleteCarOptionDto) {
        await this.carOptionsExtraPaymentService.deleteCarExtraPaymentOption(dto);

        return 'Successfully removed';
    }
}
