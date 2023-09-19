import { PartialType } from '@nestjs/mapped-types';
import { CreateCarPriceDto } from './create-car_price.dto';

export class UpdateCarPriceDto extends PartialType(CreateCarPriceDto) {}
