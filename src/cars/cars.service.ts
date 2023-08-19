import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { plainToInstance } from 'class-transformer';
import { Car } from './entities/car.model';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseUtils } from '../../src/base/response.utils';
import { PagingCarDto } from './dto/paging-cars.dto';
import { PagingResponse } from './dto/paging-cars-response.dto';
import { CarType } from './entities/car-type.model';
import { CarPrice } from './entities/car-price.model';
import { CarStatus } from './entities/car-status.model';
import { CarImages } from './entities/car-image.model';
import { Op } from 'sequelize';
import { CarSteering } from './entities/car-steering.model';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
    @InjectModel(CarImages)
    private carImageModel: typeof CarImages,
  ) {}

  async addCarImageForId(carId: string, imagePath: string) {
    const allImageOfACar = await this.carImageModel.findAndCountAll({
      where: { car_id: carId },
    });
    const carImage = new CarImages();
    carImage.car_id = Number(carId);
    carImage.url = imagePath;
    carImage.order = allImageOfACar.count;
    carImage.save();
  }

  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  findOne(id: number) {
    return this.carModel.findOne({
      where: {
        id: id,
      },
      include: [
        { model: CarType },
        { model: CarSteering },
        { model: CarPrice },
        { model: CarStatus },
        { model: CarImages },
      ],
    });
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
      return plainToInstance(CarResponseDto, carDto);
    } catch (ex) {
      console.log(ex);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST);
    }
  }

  async findAllAvailableCarForRent(
    pagingCarDto: PagingCarDto,
  ): Promise<PagingResponse> {
    console.log(pagingCarDto);
    const currentDate = new Date();
    const pickUpDate = pagingCarDto.pick_up_date;
    const dropOffDate = pagingCarDto.drop_off_date;
    const carRented = await this.carModel.findAll({
      include: [
        {
          model: CarStatus,
          where: {
            [Op.and]: [
              {
                status: {
                  [Op.in]: ['PENDING', 'HIRRING', 'NOT_RETURNED', 'FIXING'],
                },
              },
              pickUpDate
                ? {
                    [Op.and]: [
                      {
                        start_time: { [Op.gte]: currentDate },
                        end_time: { [Op.gte]: currentDate },
                      },
                      {
                        start_time: { [Op.lt]: pickUpDate },
                      },
                      { end_time: { [Op.gt]: pickUpDate } },
                    ],
                  }
                : {},
              dropOffDate
                ? {
                    [Op.and]: [
                      {
                        start_time: { [Op.gte]: currentDate },
                        end_time: { [Op.gte]: currentDate },
                      },
                      { start_time: { [Op.lt]: dropOffDate } },
                      { end_time: { [Op.gt]: dropOffDate } },
                    ],
                  }
                : {},
            ],
          },
        },
      ],
    });
    const carsRentedIds = carRented.map((car) => car.id);
    const allCarsFound = await this.carModel.findAndCountAll({
      where: {
        [Op.and]: [
          pagingCarDto.name
            ? {
                name: {
                  [Op.like]: `%${pagingCarDto.name}%`,
                },
              }
            : {},
          pagingCarDto.name
            ? {
                car_description: {
                  [Op.like]: `%${pagingCarDto.name}%`,
                },
              }
            : {},
          pagingCarDto.capability
            ? { capability: { [Op.gte]: pagingCarDto.capability } }
            : {},
        ],
      },
      include: [
        {
          model: CarType,
          where: pagingCarDto.type_id
            ? {
                id: pagingCarDto.type_id,
              }
            : {},
        },
        {
          model: CarSteering,
          where: pagingCarDto.type_steering_id
            ? {
                id: pagingCarDto.type_steering_id,
              }
            : {},
        },
        {
          model: CarPrice,
          where: pagingCarDto.price
            ? {
                price_rent_per_day: {
                  [Op.lte]: pagingCarDto.price,
                },
              }
            : {},
          order: [['createdAt', 'DESC']],
        },
        {
          model: CarStatus,
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  { status: 'AVAILABLE' },
                  pagingCarDto.pick_up_date
                    ? {
                        [Op.and]: [
                          {
                            start_time: { [Op.lte]: pagingCarDto.pick_up_date },
                          },
                          { start_time: { [Op.lt]: currentDate } },
                        ],
                      }
                    : {},
                  pagingCarDto.drop_off_date
                    ? {
                        [Op.or]: [
                          { end_time: null },
                          {
                            end_time: { [Op.lt]: pagingCarDto.drop_off_date },
                          },
                        ],
                      }
                    : {},
                  {
                    car_id: { [Op.notIn]: carsRentedIds },
                  },
                ],
              },
              {
                [Op.and]: [
                  {
                    status: {
                      [Op.in]: ['PENDING', 'HIRRING', 'NOT_RETURNED', 'FIXING'],
                    },
                  },
                  pickUpDate
                    ? {
                        [Op.and]: [
                          {
                            start_time: { [Op.gte]: currentDate },
                            end_time: { [Op.gte]: currentDate },
                          },
                          {
                            start_time: { [Op.lt]: pickUpDate },
                          },
                          { end_time: { [Op.lt]: pickUpDate } },
                        ],
                      }
                    : {},
                  dropOffDate
                    ? {
                        [Op.and]: [
                          {
                            start_time: { [Op.gte]: currentDate },
                            end_time: { [Op.gte]: currentDate },
                          },
                          { start_time: { [Op.gt]: dropOffDate } },
                          { end_time: { [Op.gt]: dropOffDate } },
                        ],
                      }
                    : {},
                ],
              },
            ],
          },
        },
        {
          model: CarImages,
          where: {},
          order: [['order', 'ASC']],
        },
      ],
      limit: pagingCarDto.limit ? +pagingCarDto.limit : 1000,
      offset: pagingCarDto.offset ? +pagingCarDto.offset : 0,
    });
    return new PagingResponse(
      allCarsFound.rows,
      allCarsFound.count,
      +pagingCarDto.offset,
      +pagingCarDto.limit,
    );
  }
}
