import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';

@Table({ tableName: 'order_statuses' })
export class OrderStatus extends BaseModel {
  @Column
  status: string;
}
