import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceInvoiceItemsModel from "../repository/invoice-invoiceItems.model";
import InvoiceItemsModel from "../repository/invoice-items.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      InvoiceModel,
      InvoiceInvoiceItemsModel,
      InvoiceItemsModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate Invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "Document 1",
      city: "City 1",
      street: "Rua 1",
      number: "1",
      zipCode: "00000-000",
      complement: "House",
      state: "UF",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 5,
        },
        {
          id: "2",
          name: "Product 2",
          price: 10,
        },
      ],
    };

    const result = await facade.generate(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.city).toEqual(input.city);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.complement).toEqual(input.complement);
    expect(result.state).toEqual(input.state);
    expect(result.items).toHaveLength(2);


    const db = await facade.find({id: result.id})
  });

  it("should find Invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "Document 1",
      city: "City 1",
      street: "Rua 1",
      number: "1",
      zipCode: "00000-000",
      complement: "House",
      state: "UF",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 5,
        },
        {
          id: "2",
          name: "Product 2",
          price: 10,
        },
      ],
    };

    const returnFacade = await facade.generate(input);
    const result = await facade.find({ id: returnFacade.id})
    expect(result.id).toBe(returnFacade.id);
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.address.city).toEqual(input.city);
    expect(result.address.street).toEqual(input.street);
    expect(result.address.number).toEqual(input.number);
    expect(result.address.zipCode).toEqual(input.zipCode);
    expect(result.address.complement).toEqual(input.complement);
    expect(result.address.state).toEqual(input.state);
    expect(result.items).toHaveLength(2);
  });
});
