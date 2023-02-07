import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ICarOptions from 'src/carOptions/types/interfaces/ICarOptions.interface';

class CreateCarExtraPaymentOptionDto {
    @ApiProperty({ description: 'Car Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    carId: string;

    @ApiProperty({ description: 'Car Option Type', example: { value: 'Booster Premium Grey', display: 'Booster' } })
    @IsObject()
    @IsNotEmpty()
    optionType: ICarOptions;

    @ApiProperty({ description: 'Description of Car Option', example: 'add new in 2 Nov 2015' })
    @IsNotEmpty()
    optionDescription: string;

    @ApiProperty({ description: 'Price of Car Extra Option', example: '500' })
    @IsNumber()
    price: number;
}

export default CreateCarExtraPaymentOptionDto;
