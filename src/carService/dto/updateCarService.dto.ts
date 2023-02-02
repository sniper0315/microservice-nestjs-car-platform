import { IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarServiceStatus from '../types/interfaces/ICarServiceStatus.interface';
import ICarServiceType from '../types/interfaces/ICarServiceType.interface';

class UpdateCarServiceDto {
    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    carId: string;

    @ApiProperty({ description: 'Car Service Status', example: { value: 'Adding from employee in draft', display: 'Draft' } })
    @IsObject()
    @IsNotEmpty()
    status: ICarServiceStatus;

    @ApiProperty({ description: 'Car Employee Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    employeeId: string;

    @ApiProperty({ description: 'Car Service Type', example: { value: 'Fuel Diesel Refueling', display: 'Refueling' } })
    @IsObject()
    @IsNotEmpty()
    serviceType: ICarServiceType;

    @ApiProperty({ description: 'Comment for Car Service', example: '15 litre' })
    @IsNotEmpty()
    serviceComment: string;

    @ApiProperty({ description: 'Company of Car Service', example: 'Renter' })
    @IsNotEmpty()
    serviceCompany: string;

    @ApiProperty({ description: 'Price of Car Service', example: '500' })
    @IsNumber()
    price: number;
}

export default UpdateCarServiceDto;
