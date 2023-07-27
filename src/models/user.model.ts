import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Exclude } from 'class-transformer';
import { Role } from 'src/guards/role.decorator';
import { UserResponseDto } from 'src/users/dto/user.response.dto';

@Table
export class User extends BaseModel {
  @Column
  role_id: string;

  @Column
  user_name: string;

  @Exclude()
  @Column
  password: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  address: string;

  @Column
  town_city: string;

  @Column
  country: string;

  @Column
  avatar_url: string;

  @Column
  work_title: string;

  @Column
  is_active: boolean;

  mappingRoleIdToRole(): Role {
    return this.role_id === process.env.ADMIN_ROLE_ID.toString()
      ? Role.Admin
      : Role.User;
  }

  toUserResponseDto(): UserResponseDto {
    const userResponseDto = new UserResponseDto();
    userResponseDto.userName = this.user_name;
    userResponseDto.email = this.email;
    userResponseDto.avatar_url = this.avatar_url;
    userResponseDto.workTitle = this.work_title;
    userResponseDto.phone = this.phone;
    userResponseDto.address = this.address;
    userResponseDto.town_city = this.town_city;
    userResponseDto.country = this.country;
    return userResponseDto;
  }
}
