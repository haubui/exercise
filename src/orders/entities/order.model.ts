import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';
@Table({ tableName: 'orders' })
export class Order extends BaseModel {
  @Column
  user_id: number;
  @Column
  car_id: number;
  @Column
  payment_method_id: number;
  @Column
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
