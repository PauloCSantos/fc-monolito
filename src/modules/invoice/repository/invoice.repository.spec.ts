import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceInvoiceItemsModel from "./invoice-invoiceItems.model";
import InvoiceItemsModel from "./invoice-items.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      InvoiceModel,
      InvoiceInvoiceItemsModel,
      InvoiceItemsModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address: new Address({
        city: "City 1",
        street: "Rua 1",
        number: "1",
        zipCode: "00000-000",
        complement: "House",
        state: "UF",
      }),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Product 1",
          price: 5,
        }),
        new InvoiceItems({
          id: new Id("2"),
          name: "Product 2",
          price: 10,
        }),
      ],
    });
    const repository = new InvoiceRepository();
    const result = await repository.generate(invoice)

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address).toBe(invoice.address)
    expect(result.items).toBe(invoice.items)
  });

  it("should find a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address: new Address({
        city: "City 1",
        street: "Rua 1",
        number: "1",
        zipCode: "00000-000",
        complement: "House",
        state: "UF",
      }),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Product 1",
          price: 5,
        }),
        new InvoiceItems({
          id: new Id("2"),
          name: "Product 2",
          price: 10,
        }),
      ],
    });
    const repository = new InvoiceRepository();
    await repository.generate(invoice)
    
    const result = await repository.find("1")
    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address).toStrictEqual(invoice.address)
    expect(result.items).toHaveLength(2)
  });
});
