import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class DeleteCarDto {
    @ApiProperty({ description: 'Car Ids', example: ['63d3e4605ed2a85f241f6783'] })
    @IsArray()
    carId: string[];
}

export default DeleteCarDto;
