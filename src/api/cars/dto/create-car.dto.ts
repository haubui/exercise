import {
  IsNotEmpty,
  IsString,
  Max,
  Min,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Car } from '../entities/car.model';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @Type(() => Number)
  @IsInt()
  car_type_id: number;

  @Type(() => Number)
  @IsInt()
  car_steering_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  car_description: string;

  @Type(() => Number)
  @IsInt()
  @Min(2)
  @Max(42)
  capability: number;

  @Type(() => Number)
  @IsInt()
  @Min(20)
  @Max(200)
  gasoline: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0.0)
  @Max(5.0)
  average_rate: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  amount_reviews: number;

  mapToCar(): Car {
    const car = new Car();
    car.car_type_id = this.car_type_id;
    car.car_steering_id = this.car_steering_id;
    car.car_description = this.car_description;
    car.name = this.name;
    car.capability = this.capability;
    car.gasoline = this.gasoline;
    car.average_rate = this.average_rate;
    return car;
  }
}
