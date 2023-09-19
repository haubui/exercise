import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';
import { User } from 'src/shared/models/user.model';
import { OrderStatus } from 'src/api/order_status/entities/order_status.entity';
import { Car } from 'src/api/cars/entities/car.model';
import { PaymentMethod } from 'src/api/payment_method/entities/payment_method.entity';
@Table({ tableName: 'orders' })
export class Order extends BaseModel {
  @Column
  @ForeignKey(() => User)
  user_id: number;
  @Column
  @ForeignKey(() => Car)
  car_id: number;
  @Column
  @ForeignKey(() => PaymentMethod)
  payment_method_id: number;
  @Column
  @ForeignKey(() => OrderStatus)
  order_status_id: number;
  @Column
  pick_up_place: string;
  @Column
  pick_up_date: Date;
  @Column
  drop_off_place: string;
  @Column
  drop_off_date: Date;
  @Column
  billing_u_name: string;
  @Column
  billing_u_phone: string;
  @Column({ type: DataType.TEXT })
  billing_u_address: string;
  @Column
  billing_u_town_city: string;
  @Column
  car_price_ordered: number;
}
