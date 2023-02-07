import { IsBoolean, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import IProduceCompany from '../types/interfaces/IProduceCompany.interface';
import ICarModel from '../types/interfaces/ICarModel.interface';
import IYear from '../types/interfaces/IYear';
import ICarSeat from '../types/interfaces/ICarSeat.interface';
import IColor from '../types/interfaces/IColor.interface';
import ICarDoor from '../types/interfaces/ICarDoor.interface';
import ICarFuel from '../types/interfaces/ICarFuel.interface';
import ICarLuggage from '../types/interfaces/ICarLuggage.interface';
import ICarType from '../types/interfaces/ICarType.interface';
import ICarTransmission from '../types/interfaces/ICarTransmission.interface';

class CreateCarDto {
    @ApiProperty({ description: 'Company name', example: { value: 'Toyota Motor Company', display: 'Toyota' } })
    @IsObject()
    @IsNotEmpty()
    produceCompany: IProduceCompany;

    @ApiProperty({ description: 'Car Model', example: { value: 'Yaris KPGV', display: 'Yaris Cross' } })
    @IsObject()
    @IsNotEmpty()
    carModel: ICarModel;

    @ApiProperty({ description: 'Produced Year', example: '2022' })
    @IsNumber()
    produceYear: IYear;

    @ApiProperty({ description: "Seats' Count", example: '12' })
    @IsNumber()
    seats: ICarSeat;

    @ApiProperty({ description: 'Car Color', example: { hex: '46eb34', name: 'green' } })
    @IsObject()
    @IsNotEmpty()
    color: IColor;

    @ApiProperty({ description: "Doors' Count", example: '2' })
    @IsNumber()
    doors: ICarDoor;

    @ApiProperty({ description: 'Fuel Type', example: { value: 'Hybrid Electro/Diesel', display: 'Hybrid' } })
    @IsObject()
    fuelType: ICarFuel;

    @ApiProperty({ description: "Luggages' Count", example: '2' })
    @IsNumber()
    luggage: ICarLuggage;

    @ApiProperty({ description: 'Car Type', example: { value: 'Sport Utility Vehicle', display: 'SUV' } })
    @IsObject()
    carType: ICarType;

    @ApiProperty({ description: 'Transmission', example: { value: 'Continuous Variable Transmission', display: 'Automatic' } })
    @IsObject()
    transmission: ICarTransmission;

    @ApiProperty({ description: 'Car Owner Id: This must be 12 bytes of HEX string or integer', example: '61dc2d31bbe643fc32022a5f' })
    @IsNotEmpty()
    carOwnerId: string;
}

export default CreateCarDto;
