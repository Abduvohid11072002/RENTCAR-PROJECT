import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { UserModule } from 'src/user/user.module';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports: [UserModule, CarsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
