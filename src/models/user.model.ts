import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Exclude } from 'class-transformer';
import { Role } from 'src/guards/role.decorator';

@Table
export class User extends BaseModel {
  @Column
  role_id: number;

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
    return this.role_id === 1 ? Role.Admin : Role.User;
  }
}
