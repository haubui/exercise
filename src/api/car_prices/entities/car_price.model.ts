import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { Car } from 'src/api/cars/entities/car.model';
import { BaseModel } from 'src/shared/models/base.model';

@Table({ tableName: 'car_prices' })
export class CarPrice extends BaseModel {
  @Column
  @ForeignKey(() => Car)
  car_id: number;
  @Column
  price_rent_per_day: number;
  @Column
  discount_start: Date;
  @Column
  discount_until: Date;
  @Column
  discount_price: number;
  @BelongsTo(() => Car)
  cars: Car[];
}
