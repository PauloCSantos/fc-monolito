import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { migrator } from "../../config-migrations/migrator";

import { Umzug } from "umzug";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { productsRoute } from "../routes/products.route";

describe("Products tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/product", productsRoute);

  let sequelize: Sequelize;

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    migration = migrator(sequelize);
    await migration.up();
  });

  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });

  it("should create product", async () => {
    const response = await request(app).post("/product").send({
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      purchasePrice: 120,
      stock: 12,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("DDD");
    expect(response.body.description).toBe("Domain Driven Design");
    expect(response.body.purchasePrice).toBe(120)
    expect(response.body.stock).toBe(12)
  });
});
