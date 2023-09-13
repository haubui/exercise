import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseUtils } from 'src/base/response.utils';
import { UsersService } from 'src/users/users.service';
import { CarsService } from 'src/cars/cars.service';
import { ERROR_CODES } from 'src/base/error.code';
import { Order } from './entities/order.model';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { sequelizeGloble } from 'src/database/sequalize.config';
import { CarStatus } from 'src/car_statuses/entities/car_status.model';
import { CarStatusesService } from 'src/car_statuses/car_statuses.service';
import { CreateCarStatusDto } from 'src/car_statuses/dto/create-car_status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    private readonly carStatusesService: CarStatusesService,
    private readonly usersService: UsersService,
    private readonly carService: CarsService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const transaction = await sequelizeGloble.transaction();
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
      const carCanOrder = await this.carService.findAllAvailableCarForOrder(
        createOrderDto,
        carOrder,
      );
      if (!carOrder) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_AVAILABLE.error_code,
          message:
            ERROR_CODES.CAR_NOT_AVAILABLE.message +
            ` from ${createOrderDto.pick_up_date}  to ${createOrderDto.drop_off_date}`,
        });
      }
      const orderNew = plainToInstance(Order, createOrderDto);
      await orderNew.save({ transaction });
      const carStatusDto = new CreateCarStatusDto();
      carStatusDto.status = 'PENDING';
      carStatusDto.car_id = createOrderDto.car_id;
      carStatusDto.start_time = createOrderDto.pick_up_date;
      carStatusDto.end_time = createOrderDto.drop_off_date;
      carStatusDto.pick_up_place = createOrderDto.pick_up_place;
      carStatusDto.drop_off_place = createOrderDto.drop_off_place;
      const carStatus = plainToInstance(CarStatus, carStatusDto);
      await carStatus.save({ transaction });
      await transaction.commit();
      return carCanOrder;
    } catch (err) {
      console.log(err);
      transaction.rollback();
      ResponseUtils.throwErrorException();
    }
  }

  findAll() {
    try {
      return this.orderModel.findAll();
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }

  findOne(id: number) {
    try {
      return this.orderModel.findOne({ where: { id: id } });
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const orderWantToUpdate = await this.orderModel.findOne({
        where: { id: id },
      });
      if (orderWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const orderUpdated = plainToInstance(Order, updateOrderDto);
      await orderWantToUpdate.update(orderUpdated);
      return orderUpdated;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }

  async remove(id: number) {
    const transaction = await sequelizeGloble.transaction();
    try {
      const order = await this.orderModel.findByPk(id, {
        transaction,
      });

      if (!order) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      await order.destroy({ transaction });
      await transaction.commit();
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }
}
