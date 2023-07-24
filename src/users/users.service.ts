import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseUtils } from 'src/base/response.utils';
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
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
        throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND);
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
    const user = await this.findOneById(id);
    await user.destroy();
  }
}
