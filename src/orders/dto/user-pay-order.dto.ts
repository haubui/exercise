import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UserPayOrderDto {
  @Type(() => Number)
  @IsInt()
  order_id: number;

  @Type(() => Number)
  @IsInt()
  user_id: number;

  @Type(() => Number)
  @IsInt()
  car_id: number;

  @Type(() => Number)
  @IsInt()
  payment_method_id: number;

  @Type(() => Number)
  @IsInt()
  order_status_id: number;
}
