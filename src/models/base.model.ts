import { Exclude } from 'class-transformer';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';

export class BaseModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Exclude()
  @CreatedAt
  created_at?: Date;

  @Exclude()
  @UpdatedAt
  updated_at?: Date;
}
