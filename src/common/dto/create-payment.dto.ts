import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  carId: string;
}

export class PaymentActiveDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  paymentNumber: number;
}
