import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'anchors' })
export class Anchor extends Model<Anchor> {
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, type: DataType.DOUBLE })
  x_coord: number;

  @Column({ allowNull: false, type: DataType.DOUBLE })
  y_coord: number;
}
