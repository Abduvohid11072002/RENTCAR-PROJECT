import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SignUpUserDto, UpdateUserDto } from 'src/common/dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @ApiProperty({ type: SignUpUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @ApiProperty({ type: UpdateUserDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ) {
    return await this.userService.update(id, updateUserDto, request);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
