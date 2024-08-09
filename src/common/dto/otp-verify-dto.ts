// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAuthDto } from './sign-up-dto';

// export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class OtpVerifyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 40)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

export class RefreshDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh : string
}
