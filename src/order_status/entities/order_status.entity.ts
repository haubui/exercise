import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';

@Table({ tableName: 'order_statuses' })
export class OrderStatus extends BaseModel {
  @Column
  status: string;
}
