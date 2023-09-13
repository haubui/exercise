import { Module, forwardRef } from '@nestjs/common';
import { RecentCarsService } from './recent_cars.service';
import { RecentCarsController } from './recent_cars.controller';
import { UsersService } from 'src/users/users.service';
import { CarsService } from 'src/cars/cars.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecentCar } from './entities/recent_car.model';
import { Car } from 'src/cars/entities/car.model';
import { CarsModule } from 'src/cars/cars.module';
import { CarImages } from 'src/cars/entities/car-image.model';
import { CarSteering } from 'src/cars/entities/car-steering.model';
import { CarType } from 'src/cars/entities/car-type.model';
import { UsersModule } from 'src/users/users.module';
import { QueueModule } from 'src/queue/queue.module';
import { CarStatus } from 'src/car_statuses/entities/car_status.model';
import { CarPrice } from 'src/car_prices/entities/car_price.model';

@Module({
  controllers: [RecentCarsController],
  providers: [RecentCarsService, CarsService, UsersService],
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
    UsersModule,
    QueueModule,
    forwardRef(() => CarsModule),
  ],
  exports: [RecentCarsService],
})
export class RecentCarsModule {}
