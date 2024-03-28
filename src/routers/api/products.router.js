import CustomRouter from "../CustomRouter.js";
// import product from "../../data/fs/product.fs.js";
import products from "../../data/mongo/products.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passport.authenticate("jwt", { session: false }),
      create
    );

    this.read("/", ["PUBLIC"], read);

    this.read("/:pid", ["PUBLIC"], readOne);

    this.update("/:pid", ["ADMIN", "PREM"], update);

    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

export default ProductsRouter;
