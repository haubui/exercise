import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { Car } from 'src/cars/entities/car.model';
import { BaseModel } from 'src/models/base.model';
@Table({ tableName: 'car_statuses' })
export class CarStatus extends BaseModel {
  @Column
  @ForeignKey(() => Car)
  car_id: number;
  @Column
  status: string;
  @Column
  start_time: Date;
  @Column
  end_time: Date;
  @Column
  pick_up_place: string;
  @Column
  drop_off_place: string;

  @BelongsTo(() => Car)
  cars: Car[];
}
