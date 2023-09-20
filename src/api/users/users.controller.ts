import {
  Controller,
  Param,
  Get,
  Delete,
  HttpCode,
  Post,
  Body,
  HttpStatus,
  Req,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { Public } from 'src/shared/guards/public.decorator';
import { Role, Roles } from 'src/shared/guards/role.decorator';
import { UpdateOptions } from 'sequelize';
import { UpdateUserDto } from './dto/udate.user.dto';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { ERROR_CODES } from 'src/shared/base/error.code';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') param): Promise<UserResponseDto> {
    return (await this.usersService.findOneById(param)).toUserResponseDto();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles(Role.Admin)
  async removeUser(@Param('id') userId): Promise<void> {
    return this.usersService.remove(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async registerUser(@Body() userDto: UserDto): Promise<UserResponseDto> {
    return this.usersService.registerUser(userDto);
  }

  @Post('profile')
  @Roles(Role.User)
  async getAUser(@Req() request: any): Promise<UserResponseDto> {
    try {
      console.log('profile', request);
      const user = await this.usersService.findOneById(
        request.user.user_id.toString(),
      );
      return user.toUserResponseDto();
    } catch (e) {
      console.log(e);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, e);
    }
  }

  @Patch('me/update')
  @Roles(Role.User)
  async updateProfile(
    @Req() request: any,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.usersService.findOneById(request.user.user_id);
      if (!user) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        });
      }
      await user.update(
        {
          phone: body.phone,
          address: body.address,
          work_title: body.work_title,
          town_city: body.town_city,
          country: body.country,
          avatar_url: body.address,
          user_name: body.user_name,
        },
        { where: { id: request.user.user_id } } as UpdateOptions,
      );
      const userReturn = await this.usersService.findOneById(
        request.user.user_id,
      );
      return userReturn.toUserResponseDto();
    } catch (e) {
      console.log(e);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, e);
    }
  }
}
