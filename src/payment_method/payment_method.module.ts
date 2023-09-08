import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './entities/payment_method.entity';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  imports: [SequelizeModule.forFeature([PaymentMethod])],
})
export class PaymentMethodModule {}
