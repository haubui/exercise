import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';

@Table({ tableName: 'payment_methods' })
export class PaymentMethod extends BaseModel {
  @Column
  payment_type: string;
}
