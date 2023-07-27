import {
  Controller,
  Param,
  Get,
  Delete,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllUserParam } from 'src/auth/dto/get.all.user.param';
import { User } from 'src/models/user.model';
import { UserDto } from './dto/user.dto';

@Controller('users/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param() param: GetAllUserParam): Promise<User> {
    return await this.usersService.findOneById(param.userId.toString());
  }

  @HttpCode(204)
  @Delete(':id')
  async removeUser(@Param() param: GetAllUserParam): Promise<void> {
    return this.usersService.remove(param.userId.toString());
  }

  @Post('register')
  async registerUser(@Body() userDto: UserDto) {}
}
