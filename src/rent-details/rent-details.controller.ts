import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';
import { CreateRentDetailDto } from '../common/dto/create-rent-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('rent-details')
@Controller('rent-details')
export class RentDetailsController {
  constructor(private readonly rentDetailsService: RentDetailsService) {}

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Post()
  async create(@Body() createRentDetailDto: CreateRentDetailDto) {
    return await this.rentDetailsService.create(createRentDetailDto);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get()
  async findAll() {
    return await this.rentDetailsService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rentDetailsService.findOne(id);
  }
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.rentDetailsService.delete(id);
  }
}
