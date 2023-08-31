import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';

@Table({ tableName: 'reviews' })
export class Review extends BaseModel {
  @Column
  car_id: number;
  @Column
  user_id: number;
  @Column
  rating: number;
  @Column({ type: DataType.TEXT })
  comment: string;
}
