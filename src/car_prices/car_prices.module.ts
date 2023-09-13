import { Module } from '@nestjs/common';
import { CarPricesService } from './car_prices.service';
import { CarPricesController } from './car_prices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarPrice } from './entities/car_price.model';

@Module({
  imports: [SequelizeModule.forFeature([CarPrice])],
  controllers: [CarPricesController],
  providers: [CarPricesService],
})
export class CarPricesModule {}
