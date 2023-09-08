import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { Review } from 'src/reviews/entities/review.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarImages } from 'src/cars/entities/car-image.model';
import { CarPrice } from 'src/cars/entities/car-price.model';
import { CarStatus } from 'src/cars/entities/car-status.model';
import { CarSteering } from 'src/cars/entities/car-steering.model';
import { CarType } from 'src/cars/entities/car-type.model';
import { Car } from 'src/cars/entities/car.model';
import { RecentCar } from 'src/recent_cars/entities/recent_car.model';
import { PaymentMethod } from './entities/payment_method.entity';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  imports: [SequelizeModule.forFeature([PaymentMethod])],
})
export class PaymentMethodModule {}
