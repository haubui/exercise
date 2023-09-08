import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
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
  @IsString()
  @IsNotEmpty()
  pick_up_place: string;
  @IsDate()
  pick_up_date: Date;
  @IsString()
  @IsNotEmpty()
  drop_off_place: string;
  @IsDate()
  drop_off_date: Date;
  @IsString()
  @IsNotEmpty()
  billing_u_name: string;
  @IsString()
  @IsNotEmpty()
  billing_u_phone: string;
  @IsString()
  @IsNotEmpty()
  billing_u_address: string;
  @IsString()
  @IsNotEmpty()
  billing_u_town_city: string;
  @Type(() => Number)
  @IsNumber()
  car_price_ordered: number;
}
