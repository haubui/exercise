import { PartialType } from '@nestjs/mapped-types';
import { CreateCarStatusDto } from './create-car_status.dto';

export class UpdateCarStatusDto extends PartialType(CreateCarStatusDto) {}
