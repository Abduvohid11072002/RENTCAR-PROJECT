import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, OtpVerifyDto, RefreshDto } from '../common/dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiProperty({ type: SignUpUserDto })
  @Post('signup')
  signup(@Body() createUserDto: SignUpUserDto) {
    return this.authService.signup(createUserDto);
  }
  @ApiProperty({ type: OtpVerifyDto })
  @Post('otp-verify')
  otp_verify(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.otp_verify(otpVerifyDto);
  }

  @ApiProperty({ type: SignInUserDto })
  @Post('signin')
  async signin(@Body() signInUserDto: SignInUserDto) {
    return await this.authService.signin(signInUserDto);
  }

  @Post('refresh-token')
  async refresh_token(@Body() refreshToken: RefreshDto) {
    return await this.authService.refresh_token(refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get('getMe')
  async getMe(@Req() request: Request) {
    return await this.authService.getMe(request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get('logout')
  async logout(@Req() request: Request) {
    return await this.authService.logout(request);
  }
}
