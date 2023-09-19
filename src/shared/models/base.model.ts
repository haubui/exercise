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
  @Column({ field: 'createdAt' })
  created_at?: Date;

  @Exclude()
  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updated_at?: Date;
}
