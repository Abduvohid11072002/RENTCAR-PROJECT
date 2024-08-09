import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from '../common/dto/create-car.dto';
import { UpdateCarDto } from '../common/dto/update-car.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiProperty({ type: CreateCarDto })
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carsService.create(createCarDto);
  }

  @Roles(Role.ADMIN, Role.CLIENT, Role.SUPERVISOR, Role.USER)
  @Get()
  async findAll() {
    return await this.carsService.findAll();
  }
  @Roles(Role.ADMIN, Role.CLIENT, Role.SUPERVISOR, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carsService.findOne(id);
  }
  @ApiProperty({ type: UpdateCarDto })
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carsService.update(id, updateCarDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.carsService.delete(id);
  }
}
