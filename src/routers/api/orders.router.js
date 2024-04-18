import { Router } from "express";
// import orders from "../../data/fs/orders.fs.js";
import orders  from "../../data/mongo/orders.mongo.js";
import {isAuth} from "../../middlewares/isAuth.js"
import { verifyToken } from "../../utils/token.util.js";
import users from "../../data/mongo/users.mongo.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, update, readOne } from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], create);
    
    this.read("/", ["USER"],isAuth, read);
    
    this.update("/:oid", update)
    
    this.read("/total/:uid", readOne)
    
    this.destroy("/:oid", )
  }
}

export default OrdersRouter;

