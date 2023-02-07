import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { getComparator, stableSort } from 'src/helpers/utils';
import CarTagsService from './carTags.service';
import CreateCarTagDto from './dto/createCarTag.dto';
import DeleteCarTagDto from './dto/deleteCarTag.dto';
import UpdateCarTagDto from './dto/updateCarTag.dto';

@Controller('car/tag')
@ApiTags('carTags')
export default class CarTagsController {
    constructor(private readonly carTagsService: CarTagsService) {}

    @Post('/')
    @ApiOperation({ summary: 'create new car tag' })
    async createCarTag(@Body() dto: CreateCarTagDto) {
        return await this.carTagsService.createCarTag(dto);
    }

    @Get('/all')
    @ApiOperation({ summary: 'get all car tags from collection' })
    async getAllCarTags() {
        const all = await this.carTagsService.getAllCarTags();
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
            const tagName = item.tagName;
            const isDeleted = item.isDeleted;

            return { id, carId, tagName, isDeleted, dateTime, metaInfo };
        });

        return newAll;
    }

    @Get('/:carTagId')
    @ApiOperation({ summary: 'get car tag by id' })
    async getSingleCarTag(@Param('carTagId') carTagId: string) {
        return await this.carTagsService.getSingleCarTag(carTagId);
    }

    @Put('/:carTagId')
    @ApiOperation({ summary: 'update car tag' })
    async updateCarTag(@Param('carTagId') carTagId: string, @Body() dto: UpdateCarTagDto) {
        return await this.carTagsService.updateCarTag(carTagId, dto);
    }

    @Delete('/remove')
    @ApiOperation({ summary: 'delete car tag logically' })
    async deleteCarTag(@Res() response, @Body() dto: DeleteCarTagDto) {
        const message = await this.carTagsService.deleteCarTag(dto);

        return response.json({
            message
        });
    }
}
