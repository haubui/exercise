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
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
