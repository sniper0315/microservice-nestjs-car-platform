import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CarModelDto {
    @ApiProperty({ description: 'Car Model', example: 'Yaris KPGV' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Car Model', example: 'Yaris Cross' })
    @IsNotEmpty()
    display: string;
}

export default CarModelDto;
