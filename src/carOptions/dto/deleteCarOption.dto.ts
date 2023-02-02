import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class DeleteCarOptionDto {
    @ApiProperty({ description: 'Car Option Ids', example: ['63d3e4605ed2a85f241f6783'] })
    @IsArray()
    carOptionId: string[];
}

export default DeleteCarOptionDto;
