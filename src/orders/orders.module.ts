import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { CarsModule } from 'src/cars/cars.module';
import { Order } from './entities/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarStatusesModule } from 'src/car_statuses/car_statuses.module';
import { CarStatusesService } from 'src/car_statuses/car_statuses.service';
import { CarStatus } from 'src/car_statuses/entities/car_status.model';
import { CitiesModule } from 'src/cities/cities.module';
import { CitiesService } from 'src/cities/cities.service';
import { City } from 'src/cities/entities/city.model';

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
