import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { UsersService } from 'src/api/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/api/users/users.module';
import { Review } from './entities/review.model';
import { QueueModule } from 'src/shared/queue/queue.module';
import { CarPrice } from '../car_prices/entities/car_price.model';
import { CarStatus } from '../car_statuses/entities/car_status.model';
import { CarsModule } from '../cars/cars.module';
import { CarsService } from '../cars/cars.service';
import { CarImages } from '../cars/entities/car-image.model';
import { CarSteering } from '../cars/entities/car-steering.model';
import { CarType } from '../cars/entities/car-type.model';
import { Car } from '../cars/entities/car.model';
import { RecentCar } from '../recent_cars/entities/recent_car.model';
import { RecentCarsModule } from '../recent_cars/recent_cars.module';

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
