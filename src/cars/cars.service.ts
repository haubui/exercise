import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { plainToInstance } from 'class-transformer';
import { Car } from './entities/car.model';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseUtils } from 'src/base/response.utils';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }

  async createCar(userDto: CreateCarDto): Promise<CarResponseDto> {
    const newCar = plainToInstance(Car, userDto);
    try {
      const carDto = await newCar.save();
      return carDto;
    } catch (ex) {
      console.log(ex);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST);
    }
  }
}
