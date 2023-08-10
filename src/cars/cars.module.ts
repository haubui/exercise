import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.model';
import { CarStatus } from './entities/car-status.model';
import { CarPrice } from './entities/car-price.model';
import { CarSteering } from './entities/car-steering.model';
import { CarType } from './entities/car-type.model';
import { CarImages } from './entities/car-image.model';
import { MulterModule } from '@nestjs/platform-express';
import { CarsFileInterceptor } from './cars.intercepters';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Car,
      CarStatus,
      CarPrice,
      CarSteering,
      CarType,
      CarImages,
    ]),
    MulterModule.register(),
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsFileInterceptor],
})
export class CarsModule {}
