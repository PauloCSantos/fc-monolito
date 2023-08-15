import express, { Request, Response } from "express";
import ProductModel from "../../../modules/store-catalog/repository/product.model";

export const storeCatalog = express.Router();

storeCatalog.post("/", async (req: Request, res: Response) => {
  try {
    await ProductModel.create({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      salesPrice: req.body.salesPrice,
    });

    res.send({ id: req.body.id });
  } catch (err) {
    res.status(500).send(err);
  }
});
