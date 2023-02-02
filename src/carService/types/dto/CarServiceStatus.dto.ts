import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarServiceStatusDto {
    @ApiProperty({ description: 'Description of Car Service Status', example: 'Adding from employee in draft' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Short Name of Car Service Status', example: 'Draft' })
    @IsNotEmpty()
    display: string;
}

export default CarServiceStatusDto;
