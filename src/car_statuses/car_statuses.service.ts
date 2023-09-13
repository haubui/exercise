import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarStatusDto } from './dto/create-car_status.dto';
import { UpdateCarStatusDto } from './dto/update-car_status.dto';
import { CarStatus } from './entities/car_status.model';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { ResponseUtils } from 'src/base/response.utils';
import { ERROR_CODES } from 'src/base/error.code';
import { Transaction } from 'sequelize';

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
      ResponseUtils.throwErrorException();
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
      ResponseUtils.throwErrorException();
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
      ResponseUtils.throwErrorException();
    }
  }
}
