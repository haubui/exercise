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
import { RecentCarsService } from 'src/recent_cars/recent_cars.service';
import { RecentCarsModule } from 'src/recent_cars/recent_cars.module';
import { RecentCar } from 'src/recent_cars/entities/recent_car.model';
import { UsersModule } from 'src/users/users.module';
import { CarStatus } from 'src/car_statuses/entities/car_status.model';
import { CarPrice } from 'src/car_prices/entities/car_price.model';

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
