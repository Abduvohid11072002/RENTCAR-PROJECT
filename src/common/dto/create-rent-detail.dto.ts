import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRentDetailDto {
  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  carId: string;

  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  paymentId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate({ message: "2024-00-00 ko'rinishida yozing" })
  start_date: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate({ message: "2024-00-00 ko'rinishida yozing" })
  end_date: Date;
}
