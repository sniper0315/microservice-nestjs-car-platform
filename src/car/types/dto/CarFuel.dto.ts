import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarFuelDto {
    @ApiProperty({ description: 'Fuel Name', example: 'Hybrid Electro/Diesel' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Fuel Type', example: 'Hybrid' })
    @IsNotEmpty()
    display: string;
}

export default CarFuelDto;
