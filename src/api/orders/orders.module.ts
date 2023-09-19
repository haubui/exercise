import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/api/users/users.module';
import { Order } from './entities/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarStatusesModule } from '../car_statuses/car_statuses.module';
import { CarStatusesService } from '../car_statuses/car_statuses.service';
import { CarStatus } from '../car_statuses/entities/car_status.model';
import { CarsModule } from '../cars/cars.module';
import { CitiesModule } from '../cities/cities.module';
import { CitiesService } from '../cities/cities.service';
import { City } from '../cities/entities/city.model';


@Module({
  controllers: [OrdersController],
  providers: [OrdersService, CarStatusesService, CitiesService],
  imports: [
    SequelizeModule.forFeature([Order, CarStatus, City]),
    UsersModule,
    CarsModule,
    CarStatusesModule,
    CitiesModule,
  ],
})
export class OrdersModule {}
