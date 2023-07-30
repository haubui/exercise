import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/guards/public.decorator';
import { Role, Roles } from 'src/guards/role.decorator';
import { GuardUtils } from 'src/guards/guard.utils';
import { Request } from 'express';
import { UserResponseDto } from 'src/users/dto/user.response.dto';

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

  @Get('manange/users')
  @Roles(Role.Admin)
  async adminGetAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Delete('manange/delete/:id')
  @Roles(Role.Admin)
  async deleteAUser(@Param('id') userId: string): Promise<void> {
    await this.usersService.remove(userId);
  }

  @Patch('manange/user/deactivate/:id')
  @Roles(Role.Admin)
  async deActivateAUser(@Param('id') userId: string): Promise<void> {
    const userBeingDeactivated = await this.usersService.findOneById(userId);
    userBeingDeactivated.is_active = false;
    userBeingDeactivated.save();
  }

  @Get('users')
  @Roles(Role.User)
  async getAllUsers(): Promise<UserResponseDto[]> {
    return (await this.usersService.findAll()).map((user) =>
      user.toUserResponseDto(),
    );
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('logout')
  async logOut(@Req() request: Request): Promise<void> {
    const token = GuardUtils.extractTokenFromRequest(request);
    await this.authService.logOut(token);
  }
}
