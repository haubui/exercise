import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { User } from 'src/shared/models/user.model';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { HashUtils } from 'src/api/auth/hash.util';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';
import {
  REGISTER_USER_QUEUE_PROCESS,
  REGISTER_USER_QUEUE_PROCESSOR,
} from 'src/shared/constants/constants';
import { ERROR_CODES } from 'src/shared/base/error.code';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectQueue(REGISTER_USER_QUEUE_PROCESSOR) private registerQueue: Queue,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = this.userModel.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        });
      }
      return user;
    } catch (error) {
      throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND);
    }
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.findOneById(id);
      if (!user) {
        throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          errors: [
            {
              code: ERROR_CODES.USER_NOT_FOUND.error_code,
              message: ERROR_CODES.USER_NOT_FOUND.message,
            },
          ],
        });
        return;
      }
      await user.destroy();
    } catch (error) {
      if (error.response.code === ERROR_CODES.USER_NOT_FOUND.error_code) {
        throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          message: ERROR_CODES.USER_NOT_FOUND.message,
          errors: [
            {
              code: ERROR_CODES.USER_NOT_FOUND.error_code,
              message: ERROR_CODES.USER_NOT_FOUND.message,
            },
          ],
        });
      } else
        throw ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, error);
    }
  }

  async registerUser(userDto: UserDto): Promise<UserResponseDto> {
    try {
      const user = new User();
      user.email = userDto.email.trim().toLowerCase();
      user.user_name = userDto.user_name;
      user.address = userDto.address;
      user.role_id = process.env.USER_ROLE_ID.toString();
      user.town_city = userDto.town_city;
      user.phone = userDto.phone;
      user.password = await HashUtils.hash(userDto.user_password);
      user.avatar_url = userDto.avatar_url;
      user.work_title = userDto.work_title;
      await user.save();
      this.registerQueue.add(REGISTER_USER_QUEUE_PROCESS, userDto);
      return user.toUserResponseDto();
    } catch (error) {
      console.log(error);
      if (error.original.code === 'ER_DUP_ENTRY') {
        throw ResponseUtils.throwErrorException(HttpStatus.CONFLICT, {
          message: 'User email or phone already in used',
          errors: [
            {
              code: 'REG-0409',
              message: 'User email or phone already in used',
            },
          ],
        });
      }
      throw ResponseUtils.throwErrorException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
