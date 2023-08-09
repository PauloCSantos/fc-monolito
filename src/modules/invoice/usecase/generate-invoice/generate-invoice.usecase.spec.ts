import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice Usecase unit test", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

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
          id: "Id 1",
          name: "Product 1",
          price: 5,
        },
        {
          id: "Id 2",
          name: "Product 2",
          price: 10,
        },
      ],
    };

    const result = await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.city).toEqual(input.city);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.complement).toEqual(input.complement);
    expect(result.state).toEqual(input.state);
    expect(result.items).toHaveLength(2)
  });
});
