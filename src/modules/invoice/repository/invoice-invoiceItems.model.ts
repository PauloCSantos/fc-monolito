import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import InvoiceModel  from "./invoice.model";
import InvoiceItemsModel from "./invoice-items.model";

@Table({ tableName: "invoice_products", timestamps: false})
export default class InvoiceInvoiceItemsModel extends Model {
    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false})
    invoiceId: string

    @BelongsTo(() => InvoiceItemsModel)
    invoiceItem: InvoiceItemsModel

    @ForeignKey(() => InvoiceItemsModel)
    @Column({ allowNull: false})
    invoiceItemId: string
}