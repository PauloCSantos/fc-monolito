import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "invoiceItems", timestamps: false })
export default class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, field: "price" })
  price: number;
}
