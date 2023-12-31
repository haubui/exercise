import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { plainToInstance } from 'class-transformer';
import { Car } from './entities/car.model';
import { InjectModel } from '@nestjs/sequelize';
import { PagingCarDto } from './dto/paging-cars.dto';
import { PagingResponse } from './dto/paging-cars-response.dto';
import { CarType } from './entities/car-type.model';
import { CarImages } from './entities/car-image.model';
import { Op, Transaction } from 'sequelize';
import { CarSteering } from './entities/car-steering.model';
import { ResponseUtils } from 'src/shared/base/response.utils';
import { ERROR_CODES } from 'src/shared/base/error.code';
import { sequelizeGloble } from 'src/database/sequalize.config';
import * as fs from 'fs';
import { CarPrice } from '../car_prices/entities/car_price.model';
import { CarStatus } from '../car_statuses/entities/car_status.model';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { CreateRecentCarDto } from '../recent_cars/dto/create-recent_car.dto';
import { RecentCarsService } from '../recent_cars/recent_cars.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
    @InjectModel(CarImages)
    private carImageModel: typeof CarImages,
    @InjectModel(CarStatus)
    private carStatusModel: typeof CarStatus,
    @Inject(forwardRef(() => RecentCarsService))
    private recentCarService: RecentCarsService,
  ) {}

  async getRecentCarsVisitedByUser(recentCarsVisitedIds: number[]) {
    try {
      return this.carModel.findAll({
        where: { id: recentCarsVisitedIds },
        group: ['id'],
        limit: 10,
      });
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async findRecommendationCars(
    car_id: string,
  ): Promise<PagingResponse | PromiseLike<PagingResponse>> {
    console.log(`car_id = ${car_id}`);
    try {
      const aCar = await this.carModel.findOne({
        where: {
          id: car_id,
        },
      });
      if (aCar === null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }
      const dto = new PagingCarDto();
      dto.type_id = [aCar.car_type_id];
      dto.capability = aCar.capability;
      dto.price = aCar.current_price;
      dto.capability = aCar.capability;
      const recommendationCars = this.findAllAvailableCarForRent(dto);
      return recommendationCars;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async updateEverageReviewForACard(
    car_id: number,
    rating: number,
    amountReview: number,
    trans: Transaction,
  ) {
    const car = await this.carModel.findOne({
      where: { id: car_id },
    });
    if (!car) {
      ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
        message: ERROR_CODES.CAR_NOT_FOUND.message,
      });
    }
    if (rating < 1 || rating > 5) {
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, {
        message: 'Rating must be between 1 and 5',
      });
    }
    console.log(rating, amountReview);
    console.log(car);
    await car.update(
      {
        average_rate: Number(rating),
        amount_reviews: amountReview,
        updatedAt: new Date(),
      },
      { where: { id: car_id }, transaction: trans },
    );
  }

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

  async findOne(car_id: number) {
    try {
      const aCarFullInfo = this.carModel.findOne({
        where: {
          id: car_id,
        },
        include: [
          { model: CarType },
          { model: CarSteering },
          { model: CarPrice },
          { model: CarStatus },
          { model: CarImages },
        ],
      });
      if (aCarFullInfo === null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }
      return aCarFullInfo;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async findOneForUpdate(car_id: number) {
    try {
      const aCarFullInfo = this.carModel.findOne({
        where: {
          id: car_id,
        },
        lock: true,
      });
      if (aCarFullInfo === null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }
      return aCarFullInfo;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async findOneCarDetail(user_id: number, car_id: number) {
    try {
      const aCarFullInfo = this.carModel.findOne({
        where: {
          id: car_id,
        },
        include: [
          { model: CarType },
          { model: CarSteering },
          { model: CarPrice },
          { model: CarStatus },
          { model: CarImages },
        ],
      });
      if (aCarFullInfo === null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }
      const recentCarDto = new CreateRecentCarDto();
      recentCarDto.car_id = car_id;
      recentCarDto.user_id = user_id;
      this.recentCarService.create(recentCarDto);
      return aCarFullInfo;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
      const carWantToUpdate = await this.carModel.findOne({
        where: { id: id },
      });
      if (carWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }
      const carUpdated = plainToInstance(Car, updateCarDto);
      await carWantToUpdate.update(carUpdated);
      return carUpdated;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, err);
    }
  }

  async remove(id: number) {
    // remove car from list, remove successfully, then we should remove car images as well.
    const transaction = await sequelizeGloble.transaction();
    try {
      // Find the car model to delete within the transaction
      const carModel = await this.carModel.findByPk(id, {
        transaction,
      });

      if (!carModel) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }

      // Delete the car model within the transaction
      await carModel.destroy({ transaction });

      // Commit the transaction if successful
      await transaction.commit();
      // Delete images resource of the car model.
      const allCarImages = await this.carImageModel.findAll({
        where: { car_id: id },
      });
      this.carImageModel.destroy({
        where: { car_id: id },
        transaction: transaction,
      });
      allCarImages.forEach((image) => {
        fs.unlinkSync(image.url);
      });
      return ResponseUtils.generateSuccessResponse({
        status_code: HttpStatus.OK,
        data: { message: 'Car item deleted successfully' },
      });
    } catch (error) {
      // Rollback the transaction in case of any error
      await transaction.rollback();
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, error);
    }
  }

  async createCar(userDto: CreateCarDto): Promise<Car> {
    const transaction = await sequelizeGloble.transaction();
    try {
      const newCar = plainToInstance(Car, userDto);
      const carDto = await newCar.save({ transaction });
      console.log(carDto);
      const carStatus = new CarStatus();
      carStatus.start_time = new Date();
      carStatus.car_id = carDto.id;
      carStatus.status = 'AVAILABLE';
      carStatus.save({ transaction });
      return carDto;
    } catch (ex) {
      console.log(ex);
      transaction.rollback();
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, ex);
    }
  }

  async getAllCarNotAvailable(
    pick_up_date?: Date,
    drop_off_date?: Date,
  ): Promise<Car[]> {
    const pickUpDate = pick_up_date;
    const dropOffDate = drop_off_date;

    const carRented =
      pickUpDate !== null && dropOffDate !== null
        ? await this.carModel.findAll({
            include: [
              {
                model: CarStatus,
                where: {
                  [Op.and]: [
                    {
                      status: {
                        [Op.in]: [
                          'PENDING',
                          'HIRING',
                          'NOT_RETURNED',
                          'FIXING',
                        ],
                      },
                    },
                    {
                      [Op.or]: [
                        {
                          [Op.and]: [
                            {
                              start_time: {
                                [Op.lte]: pick_up_date,
                              },
                            },
                            {
                              end_time: {
                                [Op.gte]: pick_up_date,
                              },
                            },
                          ],
                        },
                        {
                          [Op.and]: [
                            {
                              start_time: {
                                [Op.lte]: drop_off_date,
                              },
                            },
                            {
                              end_time: {
                                [Op.gte]: drop_off_date,
                              },
                            },
                          ],
                        },
                        {
                          [Op.and]: [
                            {
                              start_time: {
                                [Op.gte]: pick_up_date,
                              },
                            },
                            {
                              start_time: {
                                [Op.lte]: drop_off_date,
                              },
                            },
                          ],
                        },
                        {
                          [Op.and]: [
                            {
                              end_time: {
                                [Op.lte]: drop_off_date,
                              },
                            },
                            {
                              end_time: {
                                [Op.gte]: pick_up_date,
                              },
                            },
                          ],
                        },
                        {
                          [Op.and]: [
                            {
                              start_time: {
                                [Op.gte]: pick_up_date,
                              },
                            },
                            {
                              end_time: {
                                [Op.lte]: drop_off_date,
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          })
        : await this.carModel.findAll({
            include: [
              {
                model: CarStatus,
                where: {
                  [Op.and]: [
                    {
                      status: {
                        [Op.in]: [
                          'PENDING',
                          'HIRING',
                          'NOT_RETURNED',
                          'FIXING',
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          });
    return carRented;
  }

  async findAllAvailableCarForRent(
    pagingCarDto: PagingCarDto,
  ): Promise<PagingResponse> {
    try {
      console.log(pagingCarDto);
      const currentDate = new Date();
      const pickUpDate = pagingCarDto.pick_up_date;
      const dropOffDate = pagingCarDto.drop_off_date;
      if (
        typeof pickUpDate !== 'undefined' &&
        pickUpDate.getTime() < currentDate.getTime()
      ) {
        ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, {
          code: ERROR_CODES.BAD_REQUEST.error_code,
          message: 'Invalid pick up date',
        });
      }
      if (
        typeof dropOffDate !== 'undefined' &&
        dropOffDate.getTime() < currentDate.getTime()
      ) {
        ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, {
          message: 'Invalid drop off date',
        });
      }
      const carRented = await this.getAllCarNotAvailable(
        pickUpDate,
        dropOffDate,
      );
      const carsRentedIds = carRented.map((car) => car.id);
      console.log(`carsRentedIds ${carsRentedIds}`);
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
                              start_time: {
                                [Op.lte]: pagingCarDto.pick_up_date,
                              },
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
                        [Op.in]: ['PENDING', 'HIRING', 'FIXING'],
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
        group: ['id'],
        limit: pagingCarDto.limit ? +pagingCarDto.limit : 1000,
        offset: pagingCarDto.offset ? +pagingCarDto.offset : 0,
      });
      console.log(allCarsFound);
      return new PagingResponse(
        allCarsFound.rows,
        +allCarsFound.rows.length,
        +pagingCarDto.offset,
        +pagingCarDto.limit,
      );
    } catch (ex) {
      console.log(ex);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST, ex);
    }
  }
  async findAllAvailableCarForOrder(
    createOrderDto: CreateOrderDto,
    orderCar: Car,
    optimize = false,
  ): Promise<Car> {
    try {
      console.log(createOrderDto);
      const currentDate = new Date();
      const pickUpDate = createOrderDto.pick_up_date;
      const dropOffDate = createOrderDto.drop_off_date;
      const carRented = await this.getAllCarNotAvailable(
        pickUpDate,
        dropOffDate,
      );
      const carsRentedIds = carRented.map((car) => car.id);
      console.log('carsRentedIds', carsRentedIds);
      const carWasRentedBeforeSomeHowRows =
        await this.carStatusModel.findAndCountAll({
          where: {
            status: {
              [Op.in]: ['PENDING', 'HIRING', 'NOT_RETURNED', 'FIXING'],
            },
          },
        });
      const carIdsWasRentedBeforeSomeHow = Array.from(
        new Set(
          carWasRentedBeforeSomeHowRows.rows.map(
            (carStatus) => carStatus.car_id,
          ),
        ),
      );
      console.log('carIdsWasRentedBeforeSomeHow', carIdsWasRentedBeforeSomeHow);
      const carStatusNotAvailableToOrderRows =
        await this.carStatusModel.findAndCountAll({
          where: {
            [Op.and]: [
              {
                status: {
                  [Op.in]: ['PENDING', 'HIRING', 'NOT_RETURNED', 'FIXING'],
                },
              },
              {
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        start_time: {
                          [Op.lte]: createOrderDto.pick_up_date,
                        },
                      },
                      {
                        end_time: {
                          [Op.gte]: createOrderDto.pick_up_date,
                        },
                      },
                    ],
                  },
                  {
                    [Op.and]: [
                      {
                        start_time: {
                          [Op.lte]: createOrderDto.drop_off_date,
                        },
                      },
                      {
                        end_time: {
                          [Op.gte]: createOrderDto.drop_off_date,
                        },
                      },
                    ],
                  },
                  {
                    [Op.and]: [
                      {
                        start_time: {
                          [Op.gte]: createOrderDto.pick_up_date,
                        },
                      },
                      {
                        start_time: {
                          [Op.lte]: createOrderDto.drop_off_date,
                        },
                      },
                    ],
                  },
                  {
                    [Op.and]: [
                      {
                        end_time: {
                          [Op.lte]: createOrderDto.drop_off_date,
                        },
                      },
                      {
                        end_time: {
                          [Op.gte]: createOrderDto.pick_up_date,
                        },
                      },
                    ],
                  },
                  {
                    [Op.and]: [
                      {
                        start_time: {
                          [Op.gte]: createOrderDto.pick_up_date,
                        },
                      },
                      {
                        end_time: {
                          [Op.lte]: createOrderDto.drop_off_date,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        });
      const carStatusNotAvailableToOrderIds = Array.from(
        new Set(
          carStatusNotAvailableToOrderRows.rows.map(
            (carStatus) => carStatus.car_id,
          ),
        ),
      );
      console.log(
        'carStatusNotAvailableToOrderIds',
        carStatusNotAvailableToOrderIds,
      );
      if (!optimize) {
        const carCanOrdered = await this.carModel.findOne({
          where: {
            id: orderCar.id,
          },
          include: [
            {
              model: CarType,
              where: orderCar.car_type_id
                ? {
                    id: orderCar.car_type_id,
                  }
                : {},
            },
            {
              model: CarSteering,
              where: orderCar.car_steering_id
                ? {
                    id: orderCar.car_steering_id,
                  }
                : {},
            },
            {
              model: CarPrice,
              where: orderCar.current_price
                ? {
                    price_rent_per_day: {
                      [Op.lte]: orderCar.current_price,
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
                      createOrderDto.pick_up_date
                        ? {
                            [Op.and]: [
                              {
                                start_time: {
                                  [Op.lte]: createOrderDto.pick_up_date,
                                },
                              },
                              { start_time: { [Op.lt]: currentDate } },
                            ],
                          }
                        : {},
                      createOrderDto.drop_off_date
                        ? {
                            [Op.or]: [
                              { end_time: null },
                              {
                                end_time: {
                                  [Op.lt]: createOrderDto.drop_off_date,
                                },
                              },
                            ],
                          }
                        : {},
                      {
                        car_id: { [Op.notIn]: carsRentedIds },
                      },
                      {
                        [Op.or]: [
                          {
                            [Op.and]: [
                              { pick_up_place: null },
                              {
                                car_id: {
                                  [Op.notIn]: carIdsWasRentedBeforeSomeHow,
                                },
                              },
                            ],
                          },
                          {
                            pick_up_place: createOrderDto.pick_up_place,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    [Op.or]: [
                      {
                        [Op.and]: [
                          {
                            status: {
                              [Op.in]: [
                                'PENDING',
                                'HIRING',
                                'NOT_RETURNED',
                                'FIXING',
                              ],
                            },
                          },
                          {
                            [Op.and]: [
                              {
                                start_time: { [Op.gte]: currentDate },
                                end_time: { [Op.gte]: currentDate },
                              },
                              {
                                start_time: { [Op.lt]: pickUpDate },
                              },
                              { end_time: { [Op.lt]: pickUpDate } },
                              { start_time: { [Op.lt]: dropOffDate } },
                              { end_time: { [Op.lt]: dropOffDate } },
                            ],
                          },
                          {
                            car_id: {
                              [Op.notIn]: carStatusNotAvailableToOrderIds,
                            },
                          },
                          {
                            drop_off_place: createOrderDto.pick_up_place,
                          },
                        ],
                      },
                      {
                        [Op.and]: [
                          {
                            status: {
                              [Op.in]: [
                                'PENDING',
                                'HIRING',
                                'NOT_RETURNED',
                                'FIXING',
                              ],
                            },
                          },
                          {
                            [Op.and]: [
                              {
                                start_time: { [Op.gte]: currentDate },
                                end_time: { [Op.gte]: currentDate },
                              },
                              {
                                start_time: { [Op.gt]: pickUpDate },
                              },
                              { end_time: { [Op.gt]: pickUpDate } },
                              { start_time: { [Op.gt]: dropOffDate } },
                              { end_time: { [Op.gt]: dropOffDate } },
                            ],
                          },
                          {
                            car_id: {
                              [Op.notIn]: carStatusNotAvailableToOrderIds,
                            },
                          },
                          {
                            drop_off_place: createOrderDto.pick_up_place,
                          },
                        ],
                      },
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
          lock: true,
        });
        return carCanOrdered;
      } else {
        const carCanOrdered = await this.carModel.findAndCountAll({
          include: [
            {
              model: CarType,
              where: orderCar.car_type_id
                ? {
                    id: orderCar.car_type_id,
                  }
                : {},
            },
            {
              model: CarSteering,
              where: orderCar.car_steering_id
                ? {
                    id: orderCar.car_steering_id,
                  }
                : {},
            },
            {
              model: CarPrice,
              where: orderCar.current_price
                ? {
                    price_rent_per_day: {
                      [Op.lte]: orderCar.current_price,
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
                      createOrderDto.pick_up_date
                        ? {
                            [Op.and]: [
                              {
                                start_time: {
                                  [Op.lte]: createOrderDto.pick_up_date,
                                },
                              },
                              { start_time: { [Op.lt]: currentDate } },
                            ],
                          }
                        : {},
                      createOrderDto.drop_off_date
                        ? {
                            [Op.or]: [
                              { end_time: null },
                              {
                                end_time: {
                                  [Op.lt]: createOrderDto.drop_off_date,
                                },
                              },
                            ],
                          }
                        : {},
                      {
                        car_id: { [Op.notIn]: carsRentedIds },
                      },
                      {
                        [Op.or]: [
                          {
                            [Op.and]: [
                              { pick_up_place: null },
                              {
                                car_id: {
                                  [Op.notIn]: carIdsWasRentedBeforeSomeHow,
                                },
                              },
                            ],
                          },
                          {
                            pick_up_place: createOrderDto.pick_up_place,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    [Op.or]: [
                      {
                        [Op.and]: [
                          {
                            status: {
                              [Op.in]: [
                                'PENDING',
                                'HIRING',
                                'NOT_RETURNED',
                                'FIXING',
                              ],
                            },
                          },
                          {
                            [Op.and]: [
                              {
                                start_time: { [Op.gte]: currentDate },
                                end_time: { [Op.gte]: currentDate },
                              },
                              {
                                start_time: { [Op.lt]: pickUpDate },
                              },
                              { end_time: { [Op.lt]: pickUpDate } },
                              { start_time: { [Op.lt]: dropOffDate } },
                              { end_time: { [Op.lt]: dropOffDate } },
                            ],
                          },
                          {
                            car_id: {
                              [Op.notIn]: carStatusNotAvailableToOrderIds,
                            },
                          },
                          {
                            drop_off_place: createOrderDto.pick_up_place,
                          },
                        ],
                      },
                      {
                        [Op.and]: [
                          {
                            status: {
                              [Op.in]: [
                                'PENDING',
                                'HIRING',
                                'NOT_RETURNED',
                                'FIXING',
                              ],
                            },
                          },
                          {
                            [Op.and]: [
                              {
                                start_time: { [Op.gte]: currentDate },
                                end_time: { [Op.gte]: currentDate },
                              },
                              {
                                start_time: { [Op.gt]: pickUpDate },
                              },
                              { end_time: { [Op.gt]: pickUpDate } },
                              { start_time: { [Op.gt]: dropOffDate } },
                              { end_time: { [Op.gt]: dropOffDate } },
                            ],
                          },
                          {
                            car_id: {
                              [Op.notIn]: carStatusNotAvailableToOrderIds,
                            },
                          },
                          {
                            drop_off_place: createOrderDto.pick_up_place,
                          },
                        ],
                      },
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
          lock: true,
        });
        if (carCanOrdered.rows.length > 0) {
          return carCanOrdered.rows[0];
        } else {
          return null;
        }
      }
    } catch (ex) {
      console.log(ex);
      ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST);
    }
  }
}
