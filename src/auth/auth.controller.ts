import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/guards/public.decorator';
import { Role, Roles } from 'src/guards/role.decorator';
import { GuardUtils } from 'src/guards/guard.utils';
import { Request } from 'express';

@Controller('auth/v1')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('users')
  @Roles(Role.Admin)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('logout')
  async logOut(@Req() request: Request): Promise<void> {
    const token = GuardUtils.extractTokenFromRequest(request);
    await this.authService.logOut(token);
  }
}
