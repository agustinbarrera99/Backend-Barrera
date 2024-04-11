import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/dbConnection.js";
import env from "../utils/env.util.js"
const { DB_LINK } = env

console.log(argsUtil);
const environment = argsUtil.env;

let dao = {};

switch (environment) {
  case "prod":
    console.log("MONGO CONNECT")
    const { default: productsMongo } = await import("./mongo/products.mongo.js")
    const { default: usersMongo } = await import("./mongo/users.mongo.js")
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo }
    break
  case "test":
    console.log("FS CONNECTED")
    const { default: ProductsFs } = await import("./fs/product.fs.js")
    const {default: UsersFs } = await import("./fs/user.fs.js")
    const {default: OrdersFs } = await import("./fs/orders.fs.js")
    dao = { products: ProductsFs, users: UsersFs, orders: OrdersFs }
    break
  case "dev":
    dbConnection(DB_LINK)
    console.log("MONGO CONNECT")
    const { default: ProductsMongo } = await import("./mongo/products.mongo.js")
    const { default: UsersMongo } = await import("./mongo/users.mongo.js")
    const { default: OrdersMongo } = await import("./mongo/orders.mongo.js")
    dao = { products: ProductsMongo, users: UsersMongo, orders: OrdersMongo }
    break
  default:
    break;
}

export default dao;
