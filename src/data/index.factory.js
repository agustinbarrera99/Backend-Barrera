import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/dbConnection.js";
import env from "../utils/env.util.js";
import logger from "../utils/logger/index.js";

const { DB_LINK } = env;

async function configureDAO() {
  const environment = argsUtil.env;
  let dao = {};

  switch (environment) {
    case "prod":
      dbConnection(DB_LINK)
      logger.INFO("MONGO CONNECT");
      const { default: productsMongo } = await import("./mongo/products.mongo.js");
      const { default: usersMongo } = await import("./mongo/users.mongo.js");
      const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
      dao = { products: productsMongo, users: usersMongo, orders: ordersMongo };
      break;
    case "test":
      logger.INFO("FS CONNECTED");
      const { default: ProductsFs } = await import("./fs/product.fs.js");
      const { default: UsersFs } = await import("./fs/user.fs.js");
      const { default: OrdersFs } = await import("./fs/orders.fs.js");
      dao = { products: ProductsFs, users: UsersFs, orders: OrdersFs };
      break;
    case "dev":
      dbConnection(DB_LINK);
      logger.INFO("MONGO CONNECT");
      const { default: ProductsMongoDev } = await import("./mongo/products.mongo.js");
      const { default: UsersMongoDev } = await import("./mongo/users.mongo.js");
      const { default: OrdersMongoDev } = await import("./mongo/orders.mongo.js");
      dao = { products: ProductsMongoDev, users: UsersMongoDev, orders: OrdersMongoDev };
      break;
    default:
      logger.ERROR(`Unknown environment: ${environment}`);
      throw new Error(`Unknown environment: ${environment}`);
  }

  return dao;
}

const dao = await configureDAO();
export default dao;
