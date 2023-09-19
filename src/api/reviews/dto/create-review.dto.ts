import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Matches,
  Max,
  Min,
  MaxLength,
  IsInt,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  car_id: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  user_id: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1.0)
  @Max(5.0)
  rating: number;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\w+\s*|\W+){3,}$/, {
    message:
      'The field [comment] must contain only letters, numbers, and spaces',
  })
  @MaxLength(10000, {
    message: 'The field [comment] can have a maximum of 10000 characters',
  })
  comment: string;
}
