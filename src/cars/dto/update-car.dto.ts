import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Min, Max } from 'sequelize-typescript';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
