import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CarsService } from 'src/cars/cars.service';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from 'src/cars/entities/car.model';
import { CarsModule } from 'src/cars/cars.module';
import { UsersModule } from 'src/users/users.module';
import { Review } from './entities/review.model';
import { CarStatus } from 'src/cars/entities/car-status.model';
import { CarImages } from 'src/cars/entities/car-image.model';
import { CarPrice } from 'src/cars/entities/car-price.model';
import { CarSteering } from 'src/cars/entities/car-steering.model';
import { CarType } from 'src/cars/entities/car-type.model';
import { QueueModule } from 'src/queue/queue.module';
import { RecentCar } from 'src/recent_cars/entities/recent_car.model';
import { RecentCarsModule } from 'src/recent_cars/recent_cars.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, CarsService, UsersService],
  imports: [
    SequelizeModule.forFeature([
      Review,
      RecentCar,
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
    RecentCarsModule,
  ],
})
export class ReviewsModule {}
