import { Router } from "express";
// import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import {isAuth} from "../../middlewares/isAuth.js"
import { verifyToken } from "../../utils/token.util.js";
import { users } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", async (req, res, next) => {
      try {
          const data = req.body;
          const response = await orders.create(data);
          return res.success201(response)
      } catch (error) {
        return next(error)
      }
    });
    
    this.read("/", isAuth, async (req, res, next) => {
      try {
        const token = req.cookies.token
        const userData = verifyToken(token)
        const user = await users.readByEmail(userData.email)
        console.log(user)
        const filter = {
          user_id: user._id
        };
        const all = await orders.read({ filter });
        return res.success200(all)
      } catch (error) {
        return next(error);
      }
    });
    
    this.update("/:oid", async (req, res, next) => {
      try {
        const { oid } = req.params
        const data = req.body
        const response = await orders.update(oid, data)
        return res.success200(response)
      } catch (error) {
        return next(error)
      }
    })
    
    this.read("/total/:uid", async (req, res, next) => {
      try {
        const {uid} = req.params
    
        const response = await orders.report(uid)
        return res.success200(response)
      } catch (error) {
        next(error)
      }
    })
    
    this.destroy("/:oid", async(req, res, next) => {
      try {
        const { oid } = req.params
        const response = await orders.destroy(oid)
        return res.success200(response)
      } catch (error) {
        return next(error)
      }
    
    })
  }
}

export default OrdersRouter;

