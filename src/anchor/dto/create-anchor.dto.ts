import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnchorDTO {
  @ApiProperty({
    description: 'Название маяка',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Координата X',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  x_coord: number;

  @ApiProperty({
    description: 'Координата Y',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  y_coord: number;
}
