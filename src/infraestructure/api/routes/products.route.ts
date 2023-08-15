import express, { Request, Response } from "express";
import {AddProductUseCase} from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import {ProductRepository} from "../../../modules/product-adm/repository/product.repository";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(new ProductRepository());
  try {
    let req_body = req.body;

    const productDto = {
      id: req.body.id,
      name: req_body.name,
      description: req_body.description,
      purchasePrice: req_body.purchasePrice,
      stock: req_body.stock,
    };

    const output = await usecase.execute(productDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

