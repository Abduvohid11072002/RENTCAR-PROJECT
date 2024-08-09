import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  modelId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  colorId: string;

  @ApiProperty()
  @IsOptional()
  carImages: string[];

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  factoryDate: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
