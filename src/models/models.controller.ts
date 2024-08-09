import { Controller, Post, Body, Param, Delete, UseGuards, Get } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from '../common/dto/create-model.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiProperty({ type: CreateModelDto })
  @Post()
  async createModel(@Body() createModelDto: CreateModelDto) {
    return await this.modelsService.createModel(createModelDto);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get()
  async getAllModels() {
    return await this.modelsService.getAllModels();
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get(':id')
  async getOneModel(@Param('id') id: string) {
    return await this.modelsService.getOneModel(id);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Delete(':id')
  async deleteModel(@Param('id') id: string) {
    return await this.modelsService.deleteModel(id);
  }
}
