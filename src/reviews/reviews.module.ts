import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CarsService } from 'src/cars/cars.service';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from 'src/cars/entities/car.model';
import { CarsModule } from 'src/cars/cars.module';
import { UsersModule } from 'src/users/users.module';
import { Review } from './entities/review.entity';
import { CarStatus } from 'src/cars/entities/car-status.model';
import { CarImages } from 'src/cars/entities/car-image.model';
import { CarPrice } from 'src/cars/entities/car-price.model';
import { CarSteering } from 'src/cars/entities/car-steering.model';
import { CarType } from 'src/cars/entities/car-type.model';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, CarsService, UsersService],
  imports: [
    SequelizeModule.forFeature([
      Review,
      Car,
      CarStatus,
      CarPrice,
      CarSteering,
      CarType,
      CarImages,
    ]),
    CarsModule,
    UsersModule,
    QueueModule,
  ],
})
export class ReviewsModule {}
