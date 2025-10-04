import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAnchorDTO {
  @ApiProperty({
    description: 'Название маяка',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Координата X',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  x_coord: number;

  @ApiProperty({
    description: 'Координата Y',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  y_coord: number;
}
