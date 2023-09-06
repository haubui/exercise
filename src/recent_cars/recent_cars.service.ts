import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { ERROR_CODES } from 'src/base/error.code';
import { ResponseUtils } from 'src/base/response.utils';
import { CarsService } from 'src/cars/cars.service';
import { sequelizeGloble } from 'src/database/sequalize.config';
import { UsersService } from 'src/users/users.service';
import { CreateRecentCarDto } from './dto/create-recent_car.dto';
import { UpdateRecentCarDto } from './dto/update-recent_car.dto';
import { RecentCar } from './entities/recent_car.model';

@Injectable()
export class RecentCarsService {
  constructor(
    @InjectModel(RecentCar)
    private recentCarModel: typeof RecentCar,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => CarsService))
    private readonly carService: CarsService,
  ) {}
  async create(createRecentCarDto: CreateRecentCarDto) {
    try {
      const userVisitedCar = await this.usersService.findOneById(
        createRecentCarDto.user_id.toString(),
      );
      const carBeingVisited = await this.carService.findOne(
        createRecentCarDto.car_id,
      );
      if (userVisitedCar == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        });
      }
      if (carBeingVisited == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }

      try {
        const newRecentCar = plainToInstance(RecentCar, createRecentCarDto);
        const recentCar = await newRecentCar.save();
        return recentCar;
      } catch (ex) {
        console.log(ex);
        ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      console.log(e);
      ResponseUtils.throwErrorException();
    }
  }

  async findAllRecentCarByUser(user_id: string) {
    try {
      try {
        const userVisitedCar = await this.usersService.findOneById(user_id);
        if (!userVisitedCar) {
          ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
            code: ERROR_CODES.USER_NOT_FOUND.error_code,
            message: ERROR_CODES.USER_NOT_FOUND.message,
          });
        }
      } catch (e) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        });
      }

      const recentCarsVisited = await this.recentCarModel.findAll({
        where: { user_id: user_id },
      });
      try {
        const recentCarsVisitedIds = recentCarsVisited.map(
          (recentCarsVisited) => recentCarsVisited.car_id,
        );
        const recentCarsVisitedByUser =
          await this.carService.getRecentCarsVisitedByUser(
            Array.from(new Set(recentCarsVisitedIds)),
          );
        return recentCarsVisitedByUser;
      } catch (ex) {
        console.log(ex);
        ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      console.log(e);
      ResponseUtils.throwErrorException();
    }
  }

  async findOneRecentCar(id: number) {
    try {
      const transaction = await sequelizeGloble.transaction();
      const recentCar = await this.recentCarModel.findOne({
        where: { id: id },
      });
      if (recentCar == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      try {
        const oneRecentCarVisitedByUser = await this.carService.findOne(
          recentCar.car_id,
        );
        return oneRecentCarVisitedByUser;
      } catch (ex) {
        console.log(ex);
        transaction.rollback();
        ResponseUtils.throwErrorException(HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      console.log(e);
      ResponseUtils.throwErrorException();
    }
  }

  async update(id: number, updateRecentCarDto: UpdateRecentCarDto) {
    try {
      const recentCarWantToUpdate = await this.recentCarModel.findOne({
        where: { id: id },
      });
      if (recentCarWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const recentCar = plainToInstance(RecentCar, updateRecentCarDto);
      await recentCarWantToUpdate.update(recentCar);
      return recentCar;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }

  async remove(id: number) {
    try {
      const recentCarWantToDelete = await this.recentCarModel.findOne({
        where: { id: id },
      });
      if (recentCarWantToDelete == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const transaction = await sequelizeGloble.transaction();
      await this.recentCarModel.destroy({
        where: { id: id },
        transaction: transaction,
      });
      await transaction.commit();
      return ResponseUtils.generateSuccessResponse({
        status_code: HttpStatus.OK,
        data: { message: 'Recent Car item deleted successfully' },
      });
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }
}
