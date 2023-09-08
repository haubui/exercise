import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/models/base.model';

@Table({ tableName: 'payment_methods' })
export class PaymentMethod extends BaseModel {
  @Column
  payment_type: string;
}
