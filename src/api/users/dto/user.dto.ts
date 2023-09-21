import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UserDto {
  user_role = process.env.USER_ROLE_ID.toString();

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  user_password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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
