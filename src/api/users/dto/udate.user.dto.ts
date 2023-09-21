import {
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_password: string;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  avatar_url: string | null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  work_title: string | null;

  @IsString()
  @IsOptional()
  @IsMobilePhone('vi-VN')
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
