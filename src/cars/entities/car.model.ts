import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';
@Table
export class Car extends BaseModel {
  @Column
  car_type_id: number;

  @Column
  car_steering_id: number;

  @Column
  name: string;

  @Column
  car_description: string;

  @Column
  capability: number;

  @Column
  gasoline: number;

  @Column
  average_rate: number;

  @Column
  amount_reviews: number;
}
