import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductCatalogModel from "../../modules/store-catalog/repository/product.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceInvoiceItemsModel from "../../modules/invoice/repository/invoice-invoiceItems.model";

import { clientsRoute } from "./routes/clients.route";
import { productsRoute } from "./routes/products.route";
import { invoiceRoute } from "./routes/invoice.route";
import { checkoutRoute } from "./routes/checkout.route";
import InvoiceItemsModel from "../../modules/invoice/repository/invoice-items.model";
import { Umzug } from "umzug";
import { migrator } from "../config-migrations/migrator";
import { storeCatalog } from "./routes/storeCatalog";

export const app: Express = express();
app.use(express.json());
app.use("/client", clientsRoute);
app.use("/product", productsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);
app.use("/store", storeCatalog)
export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    ProductModel,
    ClientModel,
    ProductCatalogModel,
    TransactionModel,
    InvoiceInvoiceItemsModel,
    InvoiceModel,
    InvoiceItemsModel,
  ]);

  let migration: Umzug<any>;

  migration = migrator(sequelize);
  await migration.up();
  await sequelize.sync();
}
setupDb();
