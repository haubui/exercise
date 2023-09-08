import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [UsersModule, CarsModule],
})
export class OrdersModule {}
