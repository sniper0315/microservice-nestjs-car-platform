import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class ColorDto {
    @ApiProperty({ description: '3 bytes of hex string', example: '46eb34' })
    @IsNotEmpty()
    hex: string;

    @ApiProperty({ description: 'Color Name', example: 'green' })
    @IsNotEmpty()
    name: string;
}

export default ColorDto;
