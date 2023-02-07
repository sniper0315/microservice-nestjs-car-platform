import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class DeleteCarTagDto {
    @ApiProperty({ description: 'Car Tag Ids', example: ['63d3e4605ed2a85f241f6783'] })
    @IsArray()
    carTagId: string[];
}

export default DeleteCarTagDto;
