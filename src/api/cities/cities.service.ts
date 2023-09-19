import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './entities/city.model';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City)
    private cityModel: typeof City,
  ) {}

  findAll() {
    return this.cityModel.findAll();
  }

  findOne(id: number) {
    return this.cityModel.findOne({ where: { id: id } });
  }

  findOneByCityCode(city_code: string) {
    return this.cityModel.findOne({ where: { city_code: city_code } });
  }
}
