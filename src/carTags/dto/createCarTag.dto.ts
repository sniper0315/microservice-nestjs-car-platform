import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarTag from '../types/interfaces/ICarTag.interface';

class CreateCarTagDto {
    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    carId: string;

    @ApiProperty({ description: 'Car Tag Name', example: { value: 'Electro', display: 'Electro' } })
    @IsObject()
    @IsNotEmpty()
    tagName: ICarTag;
}

export default CreateCarTagDto;
