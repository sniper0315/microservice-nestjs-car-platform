import { IsBoolean, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import IProduceCompany from '../types/interfaces/IProduceCompany.interface';
import ICarModel from '../types/interfaces/ICarModel.interface';
import IYear from '../types/interfaces/IYear.interface';
import ICarSeat from '../types/interfaces/ICarSeat.interface';
import IColor from '../types/interfaces/IColor.interface';
import ICarDoor from '../types/interfaces/ICarDoor.interface';
import ICarFuel from '../types/interfaces/ICarFuel.interface';
import ICarLuggage from '../types/interfaces/ICarLuggage.interface';
import ICarType from '../types/interfaces/ICarType.interface';
import ICarTransmission from '../types/interfaces/ICarTransmission.interface';
import dateTimeFilter from '../types/interfaces/dateTimeFilter.interface';
import metaInfoFilter from '../types/interfaces/metaInfoFilter.interface';

class GetAllCarsDto {
    @ApiProperty({ description: 'Car Id', example: '' })
    id: string;

    @ApiProperty({ description: 'Company name', example: { value: '', display: '' } })
    produceCompany: IProduceCompany;

    @ApiProperty({ description: 'Car Model', example: { value: '', display: '' } })
    carModel: ICarModel;

    @ApiProperty({ description: 'Produced Year', example: '0' })
    produceYear: IYear;

    @ApiProperty({ description: "Seats' Count", example: '0' })
    seats: ICarSeat;

    @ApiProperty({ description: 'Car Color', example: { hex: '', name: '' } })
    color: IColor;

    @ApiProperty({ description: "Doors' Count", example: '0' })
    doors: ICarDoor;

    @ApiProperty({ description: 'Fuel Type', example: { value: '', display: '' } })
    fuelType: ICarFuel;

    @ApiProperty({ description: "Luggages' Count", example: '0' })
    luggage: ICarLuggage;

    @ApiProperty({ description: 'Car Type', example: { value: '', display: '' } })
    carType: ICarType;

    @ApiProperty({ description: 'Transmission', example: { value: '', display: '' } })
    transmission: ICarTransmission;

    @ApiProperty({ description: 'Car Owner Id: This must be 12 bytes of HEX string or integer', example: '' })
    carOwnerId: string;

    @ApiProperty({ description: 'Flag to check that car is active', example: 'false' })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ description: 'Flag to check that car is deleted', example: 'false' })
    @IsBoolean()
    isDeleted: boolean;

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

export default GetAllCarsDto;
