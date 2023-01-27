import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'Company name', example: 'Toyota' })
  @IsNotEmpty()
  produceCompany: string;

  @ApiProperty({
    description: 'Car Model',
    example: 'Yaris',
  })
  @IsNotEmpty()
  carModel: string;

  @ApiProperty({ description: 'Produced Year', example: '2022' })
  @IsNotEmpty()
  @IsNumberString()
  produceYear: string;

  @ApiProperty({ description: "Seats' Count", example: '12' })
  @IsNotEmpty()
  @IsNumberString()
  seats: string;

  @ApiProperty({ description: 'Car Color', example: 'white' })
  @IsNotEmpty()
  color: string;

  @ApiProperty({ description: "Doors' Count", example: '2' })
  @IsNotEmpty()
  @IsNumberString()
  doors: string;

  @ApiProperty({ description: 'Fuel Type', example: 'diesel' })
  @IsNotEmpty()
  fuelType: string;

  @ApiProperty({ description: "Luggages' Count", example: '2' })
  @IsNotEmpty()
  @IsNumberString()
  luggage: string;

  @ApiProperty({ description: 'Car Type', example: 'compact' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Transmission', example: 'manual' })
  @IsNotEmpty()
  transmission: string;

  @ApiProperty({
    description: 'Car Owner Id: This must be 12 bytes of HEX string or integer',
    example: '61dc2d31bbe643fc32022a5f',
  })
  @IsNotEmpty()
  carOwnerId: string;
}

export default CreateCarDto;
