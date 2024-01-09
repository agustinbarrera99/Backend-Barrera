import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";

const ordersRouter = Router();

export default ordersRouter;

ordersRouter.post("/", async (req, res, next) => {
  try {
      const data = req.body;
      const response = await orders.create(data);
      
      if (response instanceof Error) {
          return res.json({
              statusCode: 400,
              message: response.message,
          });
      } else {
          return res.json({
              statusCode: 201,
              response,
          });
      }
  } catch (error) {
    return next(error)
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orders.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        success: true,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        success: false,
        message: all.message,
      });
    }
  } catch (error) {
    return next(error)
  }
});

ordersRouter.get("/:uid", async(req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await orders.readOne(uid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        success: true,
        response: one,
      });
    }
  } catch (error) {
    return next(error)
  }
});