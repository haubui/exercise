import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';

@Table({ tableName: 'cities' })
export class City extends BaseModel {
  @Column
  city_name: string;
  @Column
  city_code: string;
}
