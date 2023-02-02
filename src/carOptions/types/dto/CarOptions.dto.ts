import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarOptionsDto {
    @ApiProperty({ description: 'Description of Car Option Type', example: 'Roof Rack Thule' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Short Name of Car Option Type', example: 'Roof Rack' })
    @IsNotEmpty()
    display: string;
}

export default CarOptionsDto;
