import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarTagDto {
    @ApiProperty({ description: 'Description of Car Tag', example: 'Electro' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Short Name of Car Tag', example: 'Electro' })
    @IsNotEmpty()
    display: string;
}

export default CarTagDto;
