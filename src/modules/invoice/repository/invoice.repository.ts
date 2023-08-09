import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceInvoiceItemsModel from "./invoice-invoiceItems.model";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<Invoice> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        address_street: invoice.address.street,
        address_number: invoice.address.number,
        address_complement: invoice.address.complement,
        address_city: invoice.address.city,
        address_state: invoice.address.state,
        address_zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        total: invoice.total(),
        createdAt: invoice.createdAt,

        updatedAt: invoice.updatedAt,
      },
      {
        include: [InvoiceItemsModel],
      }
    );

    return new Invoice({
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }

  async find(id: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({ where: { id: id, }, include: [InvoiceItemsModel, InvoiceInvoiceItemsModel], });
    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address({
        street: result.address_street,
        number: result.address_number,
        complement: result.address_complement,
        city: result.address_city,
        state: result.address_state,
        zipCode: result.address_zipCode,
      }),
      items: result.items.map((item: InvoiceItemsModel) => new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    })
  }
}
