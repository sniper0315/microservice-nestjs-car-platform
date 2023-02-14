import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarOptions from 'src/carOptions/types/interfaces/ICarOptions.interface';
import dateTimeFilter from 'src/car/types/interfaces/dateTimeFilter.interface';
import metaInfoFilter from 'src/car/types/interfaces/metaInfoFilter.interface';

class GetAllCarExtraPaymentOptionsDto {
    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '' })
    carId: string;

    @ApiProperty({ description: 'Car Option Type', example: { value: '', display: '' } })
    optionType: ICarOptions;

    @ApiProperty({ description: 'Description of Car Option', example: '' })
    optionDescription: string;

    @ApiProperty({ description: 'Price of Car Extra Option', example: '0' })
    priceFrom: number;

    @ApiProperty({ description: 'Price of Car Extra Option', example: '0' })
    priceTo: number;

    @ApiProperty({
        description: 'Time range to filter',
        example: {
            createdDateTimeFrom: '2023-02-01T04:38:53.485Z',
            createdDateTimeTo: '2023-02-28T04:38:53.485Z',
            lastUpdateDateTimeFrom: '2023-02-01T04:38:53.485Z',
            lastUpdateDateTimeTo: '2023-02-28T04:38:53.485Z'
        }
    })
    @IsObject()
    dateTime: dateTimeFilter;

    @ApiProperty({ description: 'Sort parameters to filter', example: { sortBy: 'createDateTime', sortDirection: 'desc', offset: 0, limit: 10 } })
    @IsObject()
    metaInfo: metaInfoFilter;
}

export default GetAllCarExtraPaymentOptionsDto;
