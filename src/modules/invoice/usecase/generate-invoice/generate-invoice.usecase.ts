import InvoiceItems from "../../domain/invoice-items.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = {
      city: input.city,
      street: input.street,
      number: input.number,
      zipCode: input.zipCode,
      complement: input.complement,
      state: input.state,
    };
    const products: InvoiceItems[] = input.items.map((product) => {
      const dataProduct = {
        id: new Id(product.id),
        name: product.name,
        price: product.price,
      };
      return new InvoiceItems(dataProduct);
    });

    const props = {
      id: new Id(),
      name: input.name,
      document: input.document,
      address: new Address(address),
      items: products,
    };

    const invoice = new Invoice(props);
    await this._invoiceRepository.generate(invoice);

    const dataItems = invoice.items.map((item) => {
      return {
        id: item.id.id,
        name: item.name,
        price: item.price,
      };
    });

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: dataItems,
      total: invoice.total(),
    };
  }
}
