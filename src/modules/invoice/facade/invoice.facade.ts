import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    generateUsecase: GenerateInvoiceUseCase;
    findUsecase: FindInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUsecase: FindInvoiceUseCase;
    private _generateUsecase: GenerateInvoiceUseCase;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._generateUsecase = usecaseProps.generateUsecase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
       return await this._generateUsecase.execute(input)
    }
    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUsecase.execute(input)
    }

}