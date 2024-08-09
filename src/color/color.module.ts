import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports:[CarsModule],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
