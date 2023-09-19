import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table
export class Auths extends BaseModel {
  @Column
  user_id: number;

  @Column
  user_token: string;

  @Column
  is_valid: boolean;
}
