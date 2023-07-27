import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UserResponseDto {
  user_role = process.env.USER_ROLE_ID.toString();

  @IsString()
  @IsNotEmpty()
  userName: string;

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
