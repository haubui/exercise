import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';

@Table({ tableName: 'recent_cars' })
export class RecentCar extends BaseModel {
  @Column
  car_id: number;
  @Column
  user_id: number;
}
