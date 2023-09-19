import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';
import { CarType } from './car-type.model';
import { CarImages } from './car-image.model';
import { CarSteering } from './car-steering.model';
import { CarStatus } from 'src/api/car_statuses/entities/car_status.model';
import { CarPrice } from 'src/api/car_prices/entities/car_price.model';
@Table({ tableName: 'cars' })
export class Car extends BaseModel {
  @Column
  @ForeignKey(() => CarType)
  car_type_id: number;

  @BelongsTo(() => CarType)
  carType: CarType;

  @Column
  @ForeignKey(() => CarSteering)
  car_steering_id: number;

  @BelongsTo(() => CarSteering)
  carSteering: CarSteering;

  @Column
  name: string;

  @Column({ type: DataType.TEXT })
  car_description: string;

  @Column
  capability: number;

  @Column
  gasoline: number;

  @Column
  average_rate: number;

  @Column
  amount_reviews: number;

  @Column
  current_price: number;

  @HasMany(() => CarPrice)
  carPrices: CarPrice;

  @HasMany(() => CarStatus)
  carStatuses: CarStatus;

  @HasMany(() => CarImages)
  carImages: CarImages;
}
