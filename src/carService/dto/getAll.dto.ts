import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarServiceStatus from '../types/interfaces/ICarServiceStatus.interface';
import ICarServiceType from '../types/interfaces/ICarServiceType.interface';
import dateTimeFilter from 'src/car/types/interfaces/dateTimeFilter.interface';
import metaInfoFilter from 'src/car/types/interfaces/metaInfoFilter.interface';

class GetAllCarServicesDto {
    @ApiProperty({ description: 'Service Id: This must be 12 bytes of HEX string or integer', example: '' })
    id: string;

    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '' })
    carId: string;

    @ApiProperty({ description: 'Car Service Status', example: { value: '', display: '' } })
    status: ICarServiceStatus;

    @ApiProperty({ description: 'Car Employee Id: This must be 12 bytes of HEX string or integer', example: '' })
    employeeId: string;

    @ApiProperty({ description: 'Car Service Type', example: { value: '', display: '' } })
    serviceType: ICarServiceType;

    @ApiProperty({ description: 'Comment for Car Service', example: '' })
    serviceComment: string;

    @ApiProperty({ description: 'Company of Car Service', example: '' })
    serviceCompany: string;

    @ApiProperty({ description: 'Price of Car Service', example: '0' })
    priceFrom: number;

    @ApiProperty({ description: 'Price of Car Service', example: '0' })
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

export default GetAllCarServicesDto;
