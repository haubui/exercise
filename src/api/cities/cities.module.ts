import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './entities/city.model';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [SequelizeModule.forFeature([City])],
  exports: [CitiesService],
})
export class CitiesModule {}
