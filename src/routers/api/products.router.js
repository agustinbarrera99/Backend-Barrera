import CustomRouter from "../CustomRouter.js";

import {
  create,
  read,
  readOne,
  update,
  destroy,
  readMe
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], create);

    this.read("/", ["PUBLIC"], read);
    
    this.read("/me", ["PREM"], readMe)

    this.read("/:pid", ["PUBLIC"], readOne);

    this.update("/:pid", ["ADMIN", "PREM"], update);

    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

export default ProductsRouter;
