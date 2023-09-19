import { Module, forwardRef } from '@nestjs/common';
import { RecentCarsService } from './recent_cars.service';
import { RecentCarsController } from './recent_cars.controller';
import { UsersService } from 'src/api/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecentCar } from './entities/recent_car.model';
import { UsersModule } from 'src/api/users/users.module';
import { QueueModule } from 'src/shared/queue/queue.module';
import { CarPrice } from '../car_prices/entities/car_price.model';
import { CarStatus } from '../car_statuses/entities/car_status.model';
import { CarsModule } from '../cars/cars.module';
import { CarsService } from '../cars/cars.service';
import { CarImages } from '../cars/entities/car-image.model';
import { CarSteering } from '../cars/entities/car-steering.model';
import { CarType } from '../cars/entities/car-type.model';
import { Car } from '../cars/entities/car.model';

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
