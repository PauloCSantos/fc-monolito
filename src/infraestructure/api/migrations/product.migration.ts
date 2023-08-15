// // import { DataTypes, Sequelize } from 'sequelize';
// // import { MigrationFn } from 'umzug';

// // export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
// //   await sequelize.getQueryInterface().createTable('products', {
// //     id: {
// //       type: DataTypes.STRING(255),
// //       primaryKey: true,
// //       allowNull: false
// //     },
// //     name: {
// //       type: DataTypes.STRING(255),
// //       allowNull: false
// //     },
// //     description: {
// //       type: DataTypes.STRING(255),
// //       allowNull: false
// //     },
// //     purchasePrice: {
// //       type: DataTypes.NUMBER,
// //       allowNull: true
// //     },
// //     salePrice: {
// //       type: DataTypes.NUMBER,
// //       allowNull: true
// //     }
// //   })
// // };

// // export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
// //   await sequelize.getQueryInterface().dropTable('products')
// // }

import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("products", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    purchasePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    salesPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("products");
};
// import { DataTypes, Sequelize } from "sequelize";
// import { MigrationFn } from "umzug";

// export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
//   await sequelize.getQueryInterface().addColumn("products", "purchasePrice", {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   });

//   await sequelize.getQueryInterface().addColumn("products", "stock", {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   });
// };

// export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
//   await sequelize.getQueryInterface().removeColumn("products", "purchasePrice");
//   await sequelize.getQueryInterface().removeColumn("products", "stock");
// };
