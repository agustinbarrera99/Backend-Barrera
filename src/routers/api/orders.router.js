// import orders from "../../data/fs/orders.fs.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, update, readOne } from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], create);
    
    this.read("/", ["USER"], read);
    
    this.update("/:oid", update)
    
    this.read("/total/:uid", readOne)
    
    this.destroy("/:oid", )
  }
}

export default OrdersRouter;

