import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from '../common/dto/create-brand.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiProperty({ type: CreateBrandDto })
  @Post()
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandsService.createBrand(createBrandDto);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get()
  async getAllBrands() {
    return await this.brandsService.getAllBrands();
  }
  
  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get(':id')
  async getOneBrand(@Param('id') id: string) {
    return await this.brandsService.getOneBrand(id);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return await this.brandsService.deleteBrand(id);
  }
}
