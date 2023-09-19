import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber } from 'class-validator';

export class CreateCarPriceDto {
  @Type(() => Number)
  @IsInt()
  car_id: number;
  @Type(() => Number)
  @IsNumber()
  price_rent_per_day: number;
  @Type(() => Date)
  @IsDate()
  discount_start: Date;
  @Type(() => Date)
  @IsDate()
  discount_until: Date;
  @Type(() => Number)
  @IsNumber()
  discount_price: number;
}
