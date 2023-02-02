import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class DeleteCarServiceDto {
    @ApiProperty({ description: 'Car Service Ids', example: ['63d3e4605ed2a85f241f6783'] })
    @IsArray()
    carServiceId: string[];
}

export default DeleteCarServiceDto;
