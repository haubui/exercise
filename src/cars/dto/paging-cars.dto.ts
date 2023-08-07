import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PagingCarDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  readonly limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly offset?: number = 0;

  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsNumber({}, { each: true })
  public type_id?: number[];

  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsNumber({}, { each: true })
  public type_steering_id?: number[];

  @IsOptional()
  @Transform((params) => {
    params.value.split(',').map(Number);
  })
  @IsNumber()
  public capability?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public price?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  public name?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  public city?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public pick_up_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public drop_off_date?: Date;
}
