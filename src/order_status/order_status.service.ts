import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { OrderStatus } from './entities/order_status.entity';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { ResponseUtils } from 'src/base/response.utils';
import { ERROR_CODES } from 'src/base/error.code';
import { sequelizeGloble } from 'src/database/sequalize.config';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus)
    private orderStatusModel: typeof OrderStatus,
  ) {}

  create(createOrderStatusDto: CreateOrderStatusDto) {
    const orderStatus = plainToInstance(OrderStatus, createOrderStatusDto);
    orderStatus.save();
    return orderStatus;
  }

  findAll() {
    try {
      return this.orderStatusModel.findAll();
    } catch (error) {
      console.log(error);
      ResponseUtils.throwErrorException();
    }
  }

  findOne(id: number) {
    try {
      return this.orderStatusModel.findAll({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResponseUtils.throwErrorException();
    }
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      const orderStatus = await this.orderStatusModel.findOne({
        where: { id: id },
      });
      if (!orderStatus) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const newOrderStatus = plainToInstance(OrderStatus, updateOrderStatusDto);
      await orderStatus.update(newOrderStatus);
      return orderStatus;
    } catch (error) {
      console.log(error);
      ResponseUtils.throwErrorException();
    }
  }

  async remove(id: number) {
    const transaction = await sequelizeGloble.transaction();
    try {
      const orderStatus = await this.orderStatusModel.findOne({
        where: { id: id },
      });
      if (!orderStatus) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      await this.orderStatusModel.destroy({
        where: { id: id },
        transaction: transaction,
      });
      await transaction.commit();
      return ResponseUtils.generateSuccessResponse({
        status_code: HttpStatus.OK,
        data: { message: 'OrderStatus item deleted successfully' },
      });
    } catch (error) {
      transaction.rollback();
      console.log(error);
      ResponseUtils.throwErrorException();
    }
  }
}
