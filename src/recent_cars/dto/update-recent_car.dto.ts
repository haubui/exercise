import { PartialType } from '@nestjs/mapped-types';
import { CreateRecentCarDto } from './create-recent_car.dto';

export class UpdateRecentCarDto extends PartialType(CreateRecentCarDto) {}
