import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceInvoiceItemsModel from "./invoice-invoiceItems.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  address_city: string;

  @Column({ allowNull: false })
  address_street: string;

  @Column({ allowNull: false })
  address_number: string;

  @Column({ allowNull: false })
  address_zipCode: string;

  @Column({ allowNull: false })
  address_complement: string;

  @Column({ allowNull: false })
  address_state: string;

  @BelongsToMany(() => InvoiceItemsModel, {
    through: { model: () => InvoiceInvoiceItemsModel },
  })
  items: InvoiceItemsModel[];

  @HasMany(() => InvoiceInvoiceItemsModel)
  invoiceProducts: InvoiceInvoiceItemsModel[];

  @Column({ allowNull: false })
  total: number;

  @Column({ allowNull: false, field: "created_at" })
  createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  updatedAt: Date;
}
