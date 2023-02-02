import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarTransmissionDto {
    @ApiProperty({ description: 'Transmission Description', example: 'Continuous Variable Transmission' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Transmission Mode', example: 'Automatic' })
    @IsNotEmpty()
    display: string;
}

export default CarTransmissionDto;
