import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Max, Min } from 'sequelize-typescript';

export class UserDto {
  user_role = 2;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  avatar_url: string | null;

  @IsString()
  @IsNotEmpty()
  workTitle: string | null;

  @IsString()
  @IsOptional()
  phone: string | null;

  @IsString()
  @IsOptional()
  address: string | null;

  @IsString()
  @IsOptional()
  town_city: string | null;

  @IsString()
  @IsOptional()
  country: string | null;
}
