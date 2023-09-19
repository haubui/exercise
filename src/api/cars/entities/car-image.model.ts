import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';
import { Car } from './car.model';
@Table({ tableName: 'car_images' })
export class CarImages extends BaseModel {
  @Column
  @ForeignKey(() => Car)
  car_id: number;
  @Column({ type: DataType.TEXT })
  url: string;
  @Column
  order: number;

  @BelongsTo(() => Car)
  cars: Car[];
}
