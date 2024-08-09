import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './cars.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, CarsRepository, PrismaService],
  exports: [CarsRepository]
})
export class CarsModule {}
