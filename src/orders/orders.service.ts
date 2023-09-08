import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseUtils } from 'src/base/response.utils';
import { UsersService } from 'src/users/users.service';
import { CarsService } from 'src/cars/cars.service';
import { ERROR_CODES } from 'src/base/error.code';

@Injectable()
export class OrdersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly carService: CarsService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const userOrdered = await this.usersService.findOneById(
        createOrderDto.user_id.toString(),
      );
      if (!userOrdered) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        });
      }
      const carOrder = await this.carService.findOne(createOrderDto.car_id);
      if (!carOrder) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }

    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
