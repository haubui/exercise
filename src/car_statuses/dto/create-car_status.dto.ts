import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarStatusDto {
  @Type(() => Number)
  @IsInt()
  car_id: number;
  @IsString()
  @IsNotEmpty()
  status: string;
  @Type(() => Date)
  @IsDate()
  start_time: Date;
  @Type(() => Date)
  @IsDate()
  end_time: Date;
  @IsString()
  @IsNotEmpty()
  pick_up_place: string;
  @IsString()
  @IsNotEmpty()
  drop_off_place: string;
}
