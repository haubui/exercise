import {
  Controller,
  Param,
  Get,
  Delete,
  HttpCode,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllUserParam } from 'src/auth/dto/get.all.user.param';
import { User } from 'src/models/user.model';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { Public } from 'src/guards/public.decorator';

@Controller('users/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param() param: GetAllUserParam): Promise<User> {
    return await this.usersService.findOneById(param.userId.toString());
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async removeUser(@Param() param: GetAllUserParam): Promise<void> {
    return this.usersService.remove(param.userId.toString());
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async registerUser(@Body() userDto: UserDto): Promise<UserResponseDto> {
    return this.usersService.registerUser(userDto);
  }
}
