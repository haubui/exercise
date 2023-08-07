import { Column, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';
import { Car } from './car.model';
@Table({ tableName: 'car_types' })
export class CarType extends BaseModel {
  @Column
  type: string;
  @Column
  amount: number;
  @HasMany(() => Car)
  cars: Car[];
}
