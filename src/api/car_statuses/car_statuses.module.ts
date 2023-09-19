import { Module } from '@nestjs/common';
import { CarStatusesService } from './car_statuses.service';
import { CarStatusesController } from './car_statuses.controller';
import { CarStatus } from './entities/car_status.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([CarStatus])],
  controllers: [CarStatusesController],
  providers: [CarStatusesService],
  exports: [CarStatusesService],
})
export class CarStatusesModule {}
