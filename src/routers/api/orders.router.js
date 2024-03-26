import { Router } from "express";
// import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import {isAuth} from "../../middlewares/isAuth.js"
import { verifyToken } from "../../utils/token.util.js";
import { users } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, update, readOne } from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", create);
    
    this.read("/", isAuth, read);
    
    this.update("/:oid", update)
    
    this.read("/total/:uid", readOne)
    
    this.destroy("/:oid", )
  }
}

export default OrdersRouter;

