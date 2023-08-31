import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRecentCarDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  car_id: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  user_id: number;
}
