import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { UsersService } from 'src/api/users/users.service';
import { ERROR_CODES } from 'src/shared/base/error.code';
import { Order } from './entities/order.model';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { sequelizeGloble } from 'src/database/sequalize.config';
import { UserPayOrderDto } from './dto/user-pay-order.dto';
import { CarStatusesService } from '../car_statuses/car_statuses.service';
import { CreateCarStatusDto } from '../car_statuses/dto/create-car_status.dto';
import { CarStatus } from '../car_statuses/entities/car_status.model';
import { CarsService } from '../cars/cars.service';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    private readonly carStatusesService: CarStatusesService,
    private readonly usersService: UsersService,
    private readonly carService: CarsService,
    private readonly citiesService: CitiesService,
  ) {}
  async create(createOrderDto: CreateOrderDto, optimize = false) {
    const transaction = await sequelizeGloble.transaction();
    console.log(`createOrderDto =====  ${createOrderDto}`);
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
      const carCanOrder = !optimize
        ? await this.carService.findAllAvailableCarForOrder(
            createOrderDto,
            carOrder,
          )
        : await this.carService.findAllAvailableCarForOrder(
            createOrderDto,
            carOrder,
            optimize,
          );
      if (!carCanOrder) {
        const city = await this.citiesService.findOneByCityCode(
          createOrderDto.pick_up_place,
        );
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_AVAILABLE.error_code,
          message:
            ERROR_CODES.CAR_NOT_AVAILABLE.message +
            ` from ${createOrderDto.pick_up_date} to ${createOrderDto.drop_off_date} at ${city.city_name}`,
        });
      }
      const orderNew = plainToInstance(Order, createOrderDto);
      const orderSaved = await orderNew.save({ transaction });
      const carStatusDto = new CreateCarStatusDto();
      carStatusDto.status = 'PENDING';
      carStatusDto.car_id = carCanOrder.id;
      carStatusDto.order_id = orderSaved.id;
      carStatusDto.start_time = createOrderDto.pick_up_date;
      carStatusDto.end_time = createOrderDto.drop_off_date;
      carStatusDto.pick_up_place = createOrderDto.pick_up_place;
      carStatusDto.drop_off_place = createOrderDto.drop_off_place;
      const carStatus = plainToInstance(CarStatus, carStatusDto);
      await carStatus.save({ transaction });
      await transaction.commit();
      return carCanOrder;
    } catch (err) {
      console.log('this is error', err);
      transaction.rollback();
      if (err.response.code === ERROR_CODES.CAR_NOT_AVAILABLE.error_code) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, err);
      } else ResponseUtils.throwErrorException();
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

  async findOrderByUserEmail(userEmail: string) {
    const user = await this.usersService.findOneByEmail(userEmail);
    try {
      return this.orderModel.findAll({ where: { user_id: user.id } });
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

  async update(updateOrderDto: UserPayOrderDto) {
    const transaction = await sequelizeGloble.transaction();
    try {
      const orderWantToUpdate = await this.orderModel.findOne({
        where: { id: updateOrderDto.order_id },
      });
      if (orderWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const orderUpdated = plainToInstance(Order, updateOrderDto);
      orderUpdated.id = updateOrderDto.order_id;
      await orderWantToUpdate.update(orderUpdated, { transaction });
      // TODO UPdate car status this.carStatusesService.update();
      transaction.commit();
      return orderUpdated;
    } catch (err) {
      console.log(err);
      transaction.rollback();
      ResponseUtils.throwErrorException();
    }
  }

  async paidAnOrder(updateOrderDto: UserPayOrderDto) {
    const transaction = await sequelizeGloble.transaction();
    try {
      const orderWantToUpdate = await this.orderModel.findOne({
        where: { id: updateOrderDto.order_id },
      });
      if (orderWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      await orderWantToUpdate.update(
        {
          order_status_id: 2,
          payment_method_id: updateOrderDto.payment_method_id,
          car_id: updateOrderDto.car_id,
          user_id: updateOrderDto.user_id,
        },
        { where: { id: updateOrderDto.order_id }, transaction },
      );
      await this.carStatusesService.updateToPaidCarStatus(
        updateOrderDto,
        transaction,
      );
      transaction.commit();
      return orderWantToUpdate;
    } catch (err) {
      console.log(err);
      transaction.rollback();
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
