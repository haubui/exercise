import { Column, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';
import { Car } from './car.model';
@Table({ tableName: 'car_steerings' })
export class CarSteering extends BaseModel {
  @Column
  steering: string;

  @HasMany(() => Car)
  cars: Car[];
}
