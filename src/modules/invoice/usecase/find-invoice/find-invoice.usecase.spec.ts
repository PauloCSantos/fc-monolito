import InvoiceItems from "../../domain/invoice-items.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = {
  city: "City 1",
  street: "Rua 1",
  number: "1",
  zipCode: "00000-000",
  complement: "House",
  state: "UF",
};

const product1 = {
  name: "Product 1",
  price: 5,
};
const product2 = {
  name: "Product 2",
  price: 10,
};

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "Document 1",
  address: new Address(address),
  items: [new InvoiceItems(product1), new InvoiceItems(product2)],
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice Usecase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(invoice.id.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.city).toEqual(invoice.address.city);
    expect(result.address.street).toEqual(invoice.address.street);
    expect(result.address.number).toEqual(invoice.address.number);
    expect(result.address.zipCode).toEqual(invoice.address.zipCode);
    expect(result.address.complement).toEqual(invoice.address.complement);
    expect(result.address.state).toEqual(invoice.address.state);
    expect(result.items).toHaveLength(2)
    expect(result.createdAt).toEqual(invoice.createdAt);
  });
});
