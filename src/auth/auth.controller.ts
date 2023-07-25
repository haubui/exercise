import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/guards/public.decorator';
import { Role, Roles } from 'src/guards/role.decorator';

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
}
