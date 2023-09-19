import { Module, forwardRef } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.model';
import { CarSteering } from './entities/car-steering.model';
import { CarType } from './entities/car-type.model';
import { CarImages } from './entities/car-image.model';
import { MulterModule } from '@nestjs/platform-express';
import { CarsFileInterceptor } from './cars.intercepters';
import { UsersModule } from 'src/api/users/users.module';
import { CarPrice } from '../car_prices/entities/car_price.model';
import { CarStatus } from '../car_statuses/entities/car_status.model';
import { RecentCar } from '../recent_cars/entities/recent_car.model';
import { RecentCarsModule } from '../recent_cars/recent_cars.module';
import { RecentCarsService } from '../recent_cars/recent_cars.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      RecentCar,
      Car,
      CarStatus,
      CarPrice,
      CarSteering,
      CarType,
      CarImages,
    ]),
    MulterModule.register(),
    forwardRef(() => RecentCarsModule),
    UsersModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsFileInterceptor, RecentCarsService],
  exports: [CarsService],
})
export class CarsModule {}
