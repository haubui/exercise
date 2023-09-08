import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { plainToInstance } from 'class-transformer';
import { Review } from './entities/review.model';
import { UsersService } from 'src/users/users.service';
import { ResponseUtils } from 'src/base/response.utils';
import { CarsService } from 'src/cars/cars.service';
import { InjectModel } from '@nestjs/sequelize';
import { ERROR_CODES } from 'src/base/error.code';
import { sequelizeGloble } from 'src/database/sequalize.config';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
    private readonly usersService: UsersService,
    private readonly carService: CarsService,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    try {
      const transaction = await sequelizeGloble.transaction();
      const userRated = await this.usersService.findOneById(
        createReviewDto.user_id.toString(),
      );
      const carBeingRated = await this.carService.findOne(
        createReviewDto.car_id,
      );
      if (userRated == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.USER_NOT_FOUND.error_code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        });
      }
      if (carBeingRated == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }

      try {
        const newReview = plainToInstance(Review, createReviewDto);

        const review = await newReview.save({ transaction });
        const reviewAmount = await this.reviewModel.findAndCountAll({
          where: { car_id: createReviewDto.car_id },
        });
        const sumReview = await this.reviewModel.sum('rating');
        const averageRate =
          (sumReview + createReviewDto.rating) / (reviewAmount.count + 1);
        await this.carService.updateEverageReviewForACard(
          createReviewDto.car_id,
          averageRate,
          reviewAmount.count,
          transaction,
        );
        await transaction.commit();
        return review;
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

  findAllReviewOfACar(car_id: number) {
    try {
      return this.reviewModel.findAll({
        where: { id: car_id },
      });
    } catch (ex) {
      ResponseUtils.throwErrorException();
    }
  }

  findOne(id: number) {
    try {
      return this.reviewModel.findOne({
        where: { id: id },
      });
    } catch (ex) {
      console.log(ex);
      ResponseUtils.throwErrorException();
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const reviewWantToUpdate = await this.reviewModel.findOne({
        where: { id: id },
      });
      if (reviewWantToUpdate == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const review = plainToInstance(Review, updateReviewDto);
      await reviewWantToUpdate.update(review);
      return review;
    } catch (err) {
      console.log(err);
      ResponseUtils.throwErrorException();
    }
  }

  async remove(id: number) {
    const transaction = await sequelizeGloble.transaction();
    try {
      const reviewWanttoDelete = await this.reviewModel.findOne({
        where: { id: id },
      });
      if (reviewWanttoDelete == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.NOT_FOUND.error_code,
          message: ERROR_CODES.NOT_FOUND.message,
        });
      }
      const carThatBeingReviedBefore = await this.carService.findOne(
        reviewWanttoDelete.car_id,
      );
      if (carThatBeingReviedBefore == null) {
        ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          code: ERROR_CODES.CAR_NOT_FOUND.error_code,
          message: ERROR_CODES.CAR_NOT_FOUND.message,
        });
      }
      await this.reviewModel.destroy({
        where: { id: id },
        transaction: transaction,
      });
      const sumReview = await this.reviewModel.sum('rating');
      const reviewAmount = await this.reviewModel.findAndCountAll({
        where: { car_id: reviewWanttoDelete.car_id },
      });
      let averageRate: number;
      if (reviewAmount.count != 0) {
        averageRate = sumReview / reviewAmount.count;
      } else {
        averageRate = 5.0;
      }
      await this.carService.updateEverageReviewForACard(
        reviewWanttoDelete.car_id,
        averageRate,
        reviewAmount.count,
        transaction,
      );
      await transaction.commit();
      return ResponseUtils.generateSuccessResponse({
        status_code: HttpStatus.OK,
        data: { message: 'Review item deleted successfully' },
      });
    } catch (err) {
      console.log(err);
      transaction.rollback();
      ResponseUtils.throwErrorException();
    }
  }
}
