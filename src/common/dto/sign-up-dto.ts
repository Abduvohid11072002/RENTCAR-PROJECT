import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  lastName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 40)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  password: string;

}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  lastName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 40)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  password: string;

  @ApiProperty()
  @IsEnum(['CLIENT', 'SUPERVISOR', 'ADMIN'])
  @IsOptional()
  role: 'CLIENT' | 'SUPERVISOR' | 'ADMIN';
}
