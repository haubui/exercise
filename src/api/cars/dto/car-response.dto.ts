import { Exclude, Expose } from 'class-transformer';
import { Car } from '../entities/car.model';
import { CarImages } from '../entities/car-image.model';
import { CarType } from '../entities/car-type.model';
import { CarSteering } from '../entities/car-steering.model';
import { CarPrice } from 'src/api/car_prices/entities/car_price.model';
import { CarStatus } from 'src/api/car_statuses/entities/car_status.model';

export class CarResponseDto {
  @Exclude()
  id: number;
  @Exclude()
  car_type_id: number;
  @Exclude()
  car_steering_id: number;
  @Expose()
  name: string;
  @Expose()
  car_description: string;
  @Expose()
  capability: number;
  @Expose()
  gasoline: number;
  @Expose()
  average_rate: number;
  @Expose()
  amount_reviews: number;

  carPrice?: CarPrice;
  carImages: CarImages[];
  carType: CarType;
  carSteering: CarSteering;
  carStatuses: CarStatus;

  constructor(car: Car) {
    this.id = car.id;
    this.car_type_id = car.car_type_id;
    this.car_steering_id = car.car_steering_id;
    this.name = car.name;
    this.car_description = car.car_description;
    this.capability = car.capability;
    this.gasoline = car.gasoline;
    this.average_rate = car.average_rate;
    this.amount_reviews = car.amount_reviews;
  }
}
