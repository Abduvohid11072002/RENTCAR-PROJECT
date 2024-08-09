import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
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
