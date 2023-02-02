import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class ProduceCompanyDto {
    @ApiProperty({ description: 'Company name', example: 'Toyota Motor Corporation' })
    @IsNotEmpty()
    value: string;

    @ApiProperty({ description: 'Company brand', example: 'Toyota' })
    @IsNotEmpty()
    display: string;
}

export default ProduceCompanyDto;
