import { Module } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';
import { RentDetailsController } from './rent-details.controller';
import { UserModule } from 'src/user/user.module';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports:[UserModule, CarsModule],
  controllers: [RentDetailsController],
  providers: [RentDetailsService],
})
export class RentDetailsModule {}
