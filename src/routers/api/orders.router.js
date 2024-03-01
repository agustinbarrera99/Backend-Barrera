import { Router } from "express";
// import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import {isAuth} from "../../middlewares/isAuth.js"
import { ObjectId } from "mongoose";
import { verifyToken } from "../../utils/token.util.js";
import { users } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

export default ordersRouter;

ordersRouter.post("/", async (req, res, next) => {
  try {
      const data = req.body;
      const response = await orders.create(data);
      return res.json({
        statusCode: 201,
        response
      })
  } catch (error) {
    return next(error)
  }
});

ordersRouter.get("/", isAuth, async (req, res, next) => {
  try {
    const token = req.cookies.token
    const userData = verifyToken(token)
    const user = await users.readByEmail(userData.email)
    console.log(user)
    const filter = {
      user_id: user._id
    };
    const all = await orders.read({ filter });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params
    const data = req.body
    const response = await orders.update(oid, data)
    return res.json({
      statusCode: 200,
      response
    })
  } catch (error) {
    return next(error)
  }
})

ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const {uid} = req.params

    const response = await orders.report(uid)
    return res.json({
      statusCode: 200,
      response
    })
  } catch (error) {
    next(error)
  }
})

ordersRouter.delete("/:oid", async(req, res, next) => {
  try {
    const { oid } = req.params
    const response = await orders.destroy(oid)
    return res.json({
      statusCode: 200,
      success: true,
      response
    })
  } catch (error) {
    return next(error)
  }

})