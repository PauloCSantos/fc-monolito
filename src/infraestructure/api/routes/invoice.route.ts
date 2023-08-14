import express, { Request, Response } from "express";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import GenerateInvoiceUseCase from "../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:invoiceId", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());

  try {
    const invoiceId = String(req.params.invoiceId);

    const output = await usecase.execute({ id: invoiceId });

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
