import { IsBoolean, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarTag from '../types/interfaces/ICarTag.interface';

class UpdateCarTagDto {
    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    carId: string;

    @ApiProperty({ description: 'Car Tag Name', example: { value: 'Electro', display: 'Electro' } })
    @IsObject()
    @IsNotEmpty()
    tagName: ICarTag;

    @ApiProperty({ description: 'Flag to check tag is deleted', example: 'false' })
    @IsBoolean()
    isDeleted: boolean;
}

export default UpdateCarTagDto;
