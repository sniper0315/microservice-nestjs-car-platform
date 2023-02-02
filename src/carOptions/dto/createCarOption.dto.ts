import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarOptions from '../types/interfaces/ICarOptions.interface';

class CreateCarOptionDto {
    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    carId: string;

    @ApiProperty({ description: 'Car Option Type', example: { value: 'Roof Rack Thule', display: 'Roof Rack' } })
    @IsObject()
    @IsNotEmpty()
    optionType: ICarOptions;

    @ApiProperty({ description: 'Description of Car Option', example: 'add new in 2 Nov 2015' })
    @IsNotEmpty()
    optionDescription: string;
}

export default CreateCarOptionDto;
