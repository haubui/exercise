import { Module } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderStatus } from './entities/order_status.entity';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [SequelizeModule.forFeature([OrderStatus])],
})
export class OrderStatusModule {}
