import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  CreatePaymentDto,
  PaymentActiveDto,
} from '../common/dto/create-payment.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles(Role.ADMIN, Role.CLIENT, Role.SUPERVISOR, Role.USER)
  @ApiProperty({ type: CreatePaymentDto })
  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: Request,
  ) {
    return await this.paymentsService.create(createPaymentDto, request);
  }

  @Roles(Role.ADMIN, Role.CLIENT, Role.SUPERVISOR, Role.USER)
  @ApiProperty({ type: CreatePaymentDto })
  @Post('active')
  async payment_active(
    @Body() pay_active: PaymentActiveDto,
    @Req() request: Request,
  ) {
    return await this.paymentsService.payment_active(pay_active, request);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get()
  async findAll() {
    return await this.paymentsService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paymentsService.remove(id);
  }
}
