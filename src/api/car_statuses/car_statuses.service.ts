import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarStatusDto } from './dto/create-car_status.dto';
import { UpdateCarStatusDto } from './dto/update-car_status.dto';
import { CarStatus } from './entities/car_status.model';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { ERROR_CODES } from 'src/shared/base/error.code';
import { Transaction } from 'sequelize';
import { UserPayOrderDto } from '../orders/dto/user-pay-order.dto';

@Injectable()
export class CarStatusesService {
  constructor(
    @InjectModel(CarStatus)
    private carStatusModel: typeof CarStatus,
  ) {}
  async create(createCarStatusDto: CreateCarStatusDto) {
    try {
      const carStatus = plainToInstance(CarStatus, createCarStatusDto);
      await carStatus.save();
      return carStatus;
    } catch (error) {
      console.log(error);
      ResponseUtils.throwErrorException(HttpStatus.ACCEPTED, error);
    }
  }

  findAll() {
    return this.carStatusModel.findAll();
  }

  findOne(id: number) {
    return this.carStatusModel.findOne({ where: { id: id } });
  }

  async update(id: number, updateCarStatusDto: UpdateCarStatusDto) {
    try {
      const carStatusToUpdate = await this.carStatusModel.findOne({
        where: { id: id },
      });
      if (carStatusToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const carStatusUpdated = plainToInstance(CarStatus, updateCarStatusDto);
      await carStatusToUpdate.update(carStatusUpdated);
      return carStatusUpdated;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async updateToPaidCarStatus(
    updateOrderDto: UserPayOrderDto,
    transaction: Transaction,
  ) {
    try {
      const carStatusToUpdate = await this.carStatusModel.findOne({
        where: { id: updateOrderDto.car_id },
      });
      if (carStatusToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const carStatusUpdated = plainToInstance(CarStatus, updateOrderDto);
      await carStatusToUpdate.update(carStatusUpdated);
      await carStatusToUpdate.update({ status: 'HIRING' }, { transaction });
      return carStatusUpdated;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async remove(id: number) {
    try {
      const carStatusToUpdate = await this.carStatusModel.findOne({
        where: { id: id },
      });
      if (carStatusToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      await carStatusToUpdate.destroy();
      return ResponseUtils.generateSuccessResponse({
        status_code: HttpStatus.OK,
        data: { message: 'CarStatus item deleted successfully' },
      });
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }
}
