import { Router } from "express";
// import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";

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

ordersRouter.get("/", async(req, res, next) => {
  try {
    const filter = {}

    const sortAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
    }

    const response = await orders.read({filter, sortAndPaginate})
    return res.json({
      statusCode: 200,
      response
    })
  } catch (error) {
    next(error)
  }
})

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const {uid} = req.params
    const filter = {user_id: uid}
    const response = await orders.read(filter);
      return res.json({
        statusCode: 200,
        success: true,
        response
      });
  } catch (error) {
    return next(error)
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