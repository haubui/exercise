import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarPriceDto } from './dto/create-car_price.dto';
import { UpdateCarPriceDto } from './dto/update-car_price.dto';
import { CarPrice } from './entities/car_price.model';
import { plainToInstance } from 'class-transformer';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { InjectModel } from '@nestjs/sequelize';
import { ERROR_CODES } from 'src/shared/base/error.code';

@Injectable()
export class CarPricesService {
  constructor(
    @InjectModel(CarPrice)
    private carPriceModel: typeof CarPrice,
  ) {}
  async create(createCarPriceDto: CreateCarPriceDto) {
    try {
      const carPrice = plainToInstance(CarPrice, createCarPriceDto);
      await carPrice.save();
      return carPrice;
    } catch (error) {
      console.log(error);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, error);
    }
  }

  findAll() {
    return this.carPriceModel.findAll();
  }

  findOne(id: number) {
    return this.carPriceModel.findOne({ where: { id: id } });
  }

  async update(id: number, updateCarPriceDto: UpdateCarPriceDto) {
    try {
      const carPriceToUpdate = await this.carPriceModel.findOne({
        where: { id: id },
      });
      if (carPriceToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const carPriceUpdated = plainToInstance(CarPrice, updateCarPriceDto);
      await carPriceToUpdate.update(carPriceUpdated);
      return carPriceUpdated;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} carPrice`;
  }
}
