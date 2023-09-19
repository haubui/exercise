import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Exclude()
  user_role = process.env.USER_ROLE_ID.toString();

  @Expose()
  user_name: string;

  @Expose()
  email: string;

  @Expose()
  avatar_url: string | null;

  @Expose()
  work_title: string | null;

  @Expose()
  phone: string | null;

  @Expose()
  address: string | null;

  @Expose()
  town_city: string | null;

  @Expose()
  country: string | null;
}
