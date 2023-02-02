import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarServiceTypeDto {
    @ApiProperty({ description: 'Description of Car Service Type', example: 'Fuel Diesel Refueling' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Short Name of Car Service Type', example: 'Refueling' })
    @IsNotEmpty()
    display: string;
}

export default CarServiceTypeDto;
