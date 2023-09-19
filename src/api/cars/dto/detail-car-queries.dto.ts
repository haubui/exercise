import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CarDetailDto {
  @Type(() => Number)
  @IsInt()
  readonly car_id: number;
}
