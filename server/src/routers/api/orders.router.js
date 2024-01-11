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
    const response = await orders.read();
      return res.json({
        statusCode: 200,
        success: true,
        response
      });
  } catch (error) {
    return next(error)
  }
});

ordersRouter.get("/:uid", async(req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await orders.readOne(uid);
      return res.json({
        statusCode: 200,
        success: true,
        response
      });
  } catch (error) {
    return next(error)
  }
});


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