import { Expose } from 'class-transformer';

export class CarResponseDto {
  @Expose()
  car_type_id: number;
  @Expose()
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
}
