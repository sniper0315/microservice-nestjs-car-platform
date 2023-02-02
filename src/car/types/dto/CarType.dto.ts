import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarTypeDto {
    @ApiProperty({ description: 'Car Type', example: 'Sport Utility Vehicle' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Short Name of Car Type', example: 'SUV' })
    @IsNotEmpty()
    display: string;
}

export default CarTypeDto;
