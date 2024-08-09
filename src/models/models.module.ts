import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports:[CarsModule],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
